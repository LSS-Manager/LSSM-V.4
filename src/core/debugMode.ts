export default (LSSM: Vue) =>
    LSSM.$stores.settings
        .getSetting<boolean>({
            moduleId: 'global',
            settingId: 'debugMode',
            defaultValue: false,
        })
        .then(debugMode => {
            if (!debugMode) return;
            let actionCounter = 0;

            const debugMsg = (
                actionId: number,
                status: 'error' | 'start' | 'success' | 'waiting',
                store: string,
                name: string,
                startTime: number,
                args: unknown[] | unknown
            ) => {
                const duration = Date.now() - startTime;
                const warning = duration > 1000;
                let durationString = '';
                if (status !== 'start') durationString = ` (${duration}ms)`;
                const messages: unknown[] = [
                    `${
                        warning ? '⚠️ ' : ''
                    }$stores: action ${actionId}[${status}]: ${store}/${name}${durationString}`,
                ];
                if (
                    store === 'api' &&
                    name === '_setSecretKey' &&
                    status === 'success'
                )
                    messages.push('***');
                else if (Array.isArray(args)) messages.push(...args);
                else messages.push(args);
                LSSM.$stores.console.debug({
                    messages,
                });
            };

            Object.values(LSSM.$stores).forEach(store => {
                if (['console', 'event'].includes(store.$id)) return;
                store.$onAction(({ name, args, after, onError }) => {
                    const startTime = Date.now();
                    const actionId = actionCounter++;
                    debugMsg(
                        actionId,
                        'start',
                        store.$id,
                        name,
                        startTime,
                        args
                    );

                    const warnInterval = window.setInterval(
                        () =>
                            debugMsg(
                                actionId,
                                'waiting',
                                store.$id,
                                name,
                                startTime,
                                args
                            ),
                        1000
                    );

                    after(result => {
                        debugMsg(
                            actionId,
                            'success',
                            store.$id,
                            name,
                            startTime,
                            result
                        );
                        window.clearInterval(warnInterval);
                    });

                    onError(error => {
                        debugMsg(
                            actionId,
                            'error',
                            store.$id,
                            name,
                            startTime,
                            error
                        );
                        window.clearInterval(warnInterval);
                    });
                });
            });
        });
