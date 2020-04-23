export default {
    namespaced: true,
    state: {
        instances: [],
        key: 0,
        channel: null,
    },
    mutations: {
        increaseKey(state) {
            state.key++;
        },
        setKey(state, value) {
            state.key = value;
        },
        setChannel(state, channel) {
            state.channel = channel;
        },
        addInstance(state, target) {
            state.instances.push(target);
        },
    },
    actions: {
        establishConnection({ commit, dispatch }) {
            return new Promise(resolve => {
                const channel = new BroadcastChannel('lssmv4_broadcast');
                channel.onmessage = message =>
                    dispatch('handleMessage', message);
                channel.addEventListener('messageerror', console.error);
                commit('setChannel', channel);
                if (!window.name) {
                    return dispatch('sendMessage', {
                        data: 'name',
                        type: 'variable_request',
                    }).then(() => {
                        const nameList = [];
                        const handler = ({ data }) => {
                            if (
                                data.target === window.name &&
                                data.type === `variable_response_name`
                            ) {
                                nameList.push(data.data);
                            }
                        };
                        channel.addEventListener('message', handler);

                        return window.setTimeout(() => {
                            channel.removeEventListener('message', handler);
                            const names = nameList
                                .map(name =>
                                    parseInt(
                                        name.replace(/^lssmv4_(external_)?/, '')
                                    )
                                )
                                .filter(name => !Number.isNaN(name));
                            const next = names.length
                                ? Math.max(...names) + 1
                                : 0;
                            window.name = `lssmv4_${next}`;
                            commit('setKey', next + 1);
                            return resolve(channel);
                        }, 500);
                    });
                } else {
                    return resolve(channel);
                }
            });
        },
        sendMessage: async (
            { state, dispatch },
            { data, type = 'information', target = '*' }
        ) => {
            if (!state.channel) await dispatch('establishConnection');
            state.channel.postMessage({
                sender: window.name,
                target,
                data,
                type,
            });
        },
        handleMessage({ state, dispatch, rootState }, { data }) {
            if (data.target !== '*' && data.target !== window.name) return;
            switch (data.type) {
                case 'variable_request':
                    dispatch('sendMessage', {
                        data: data.data
                            .split('.')
                            .reduce((a, v) => a[v], window),
                        type: `variable_response_${data.data}`,
                        target: data.sender,
                    });
                    break;
                case 'close_request':
                    if (!window.keepAlive || data.data === 'force') {
                        state.channel.onmessage = null;
                        window.close();
                    }
                    break;
                case 'echo':
                    dispatch('sendMessage', {
                        data: '',
                        type: `echo_response`,
                        target: data.sender,
                    });
                    break;
                case 'function_call':
                    dispatch('sendMessage', {
                        data: data.data.function
                            .split('.')
                            .reduce(
                                (a, v) => a[v],
                                window
                            )(...data.data.params),
                        type: `function_call_response`,
                        target: data.sender,
                    });
                    break;
                case 'load_script': {
                    let script = document.createElement('script');
                    script.src = `${rootState.server}${rootState.lang}/${
                        data.data
                    }?_=${new Date().getTime()}&uid=${rootState.lang}-${
                        window.user_id
                    }`;
                    document.body.appendChild(script);
                    break;
                }
                case 'set_variables':
                    Object.keys(data.data).forEach(
                        key => (window[key] = data.data[key])
                    );
                    break;
                default:
                    console.log(data);
            }
        },
        getExternalLSSM(
            { state, commit, rootState, dispatch },
            {
                target = null,
                features = 'noopener=0,noreffer=0',
                keepAlive = false,
                title = '',
            }
        ) {
            return new Promise(resolve => {
                if (!target) {
                    target = `lssmv4_external_${state.key}`;
                    commit('increaseKey');
                } else target = `lssmv4_external_${target}`;
                dispatch('sendMessage', {
                    type: 'echo',
                    data: '',
                    target,
                });
                const handler = ({ data }) => {
                    if (
                        data.sender !== target &&
                        data.type !== 'echo_response' &&
                        data.target !== window.name
                    )
                        return;
                    state.channel.removeEventListener('message', handler);
                    resolve({ target });
                };
                state.channel.addEventListener('message', handler);
                const instance = window.open('about:blank', target, features);
                commit('addInstance', target);
                instance.addEventListener('load', () => {
                    if (rootState.darkmode)
                        instance.document.body.classList.add('dark');
                    instance.keepAlive = keepAlive;
                    instance.document.title = `[LSS-Manager] ${title}`;
                    [...document.styleSheets].forEach(styleSheet =>
                        instance.document.head.appendChild(
                            styleSheet.ownerNode.cloneNode(true)
                        )
                    );
                    let script = document.createElement('script');
                    script.src = `${rootState.server}${
                        rootState.lang
                    }/blank.js?_=${new Date().getTime()}&uid=${
                        rootState.lang
                    }-${window.user_id}`;
                    instance.lssmv4 = window.lssmv4;
                    instance.user_id = window.user_id;
                    instance.document.addEventListener(
                        `lssm_mounted_${target}`,
                        () => resolve({ target, instance })
                    );
                    instance.document.body.appendChild(script);
                });
            });
        },
    },
};
