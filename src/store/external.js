export default {
    namespaced: true,
    state: {
        instances: {},
        key: 0,
    },
    mutations: {
        increaseKey(state) {
            state.key++;
        },
        addInstance(state, { target, instance }) {
            window.lssmv4.Vue.set(state.instances, target, instance);
        },
    },
    actions: {
        createExternalLSSM(
            { state, commit, rootState },
            {
                target = null,
                features = 'width=500,height=500,noopener=0,noreffer=0',
            }
        ) {
            return new Promise(resolve => {
                if (!target) {
                    target = `lssmv4_external_${state.key}`;
                    commit('increaseKey');
                } else target = `lssmv4_external_${target}`;
                const instance = window.open('about:blank', target, features);
                commit('addInstance', { target, instance });
                instance.addEventListener('load', () => {
                    if (rootState.darkmode)
                        instance.document.body.classList.add('dark');
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
                    instance.document.addEventListener(
                        `lssm_mounted_${target}`,
                        () => resolve(instance)
                    );
                    instance.document.body.appendChild(script);
                });
            });
        },
    },
};
