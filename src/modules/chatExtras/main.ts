import type Vue from 'vue';

import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, getSetting }) => {
    if (location.pathname === '/') {
        getSetting('chatTime').then(chatTime => {
            if (chatTime) {
                import(
                    /* webpackChunkName: "modules/chatExtras/timeFormatter" */ './assets/timeFormatter'
                ).then(async ({ default: timeFormatter }) =>
                    timeFormatter(
                        LSSM,
                        await getSetting<string>('chatTimeFormat')
                    )
                );
            }
        });

        getSetting('cloneHistoryBtnToHeader').then(clone => {
            if (clone) {
                import(
                    /* webpackChunkName: "modules/chatExtras/cloneHistoryBtnToHeader" */ './assets/cloneHistoryBtnToHeader'
                ).then(({ default: cloner }) => cloner());
            }
        });

        getSetting('selfHighlight').then(selfHighlight => {
            if (selfHighlight) {
                import(
                    /* webpackChunkName: "modules/chatExtras/selfHighlight" */ './assets/selfHighlight'
                ).then(async ({ default: selfHighlight }) =>
                    selfHighlight(
                        LSSM,
                        await getSetting<string>('selfHighlightColor'),
                        await getSetting<boolean>(
                            'selfHighlightCustomTextColor'
                        ),
                        await getSetting<string>(
                            'selfHighlightCustomTextColorColor'
                        )
                    )
                );
            }
        });

        const whisperIndicator = await getSetting('whisperIndicator');
        const mentionIndicator = await getSetting('mentionIndicator');
        if (whisperIndicator || mentionIndicator) {
            import(
                /* webpackChunkName: "modules/chatExtras/whisperMentionIndicator" */ './assets/whisperMentionIndicator'
            ).then(({ default: indicator }) =>
                indicator(LSSM, whisperIndicator, mentionIndicator)
            );
        }

        getSetting('userSelection').then(userSelection => {
            if (userSelection) {
                import(
                    /* webpackChunkName: "modules/chatExtras/userSelection" */ './assets/userSelection'
                ).then(({ default: userSelection }) => userSelection(LSSM));
            }
        });
    } else if (window.location.pathname === 'alliance_chats') {
        getSetting('lightDesignChatHistory').then(lightChatDesignActive => {
            if (lightChatDesignActive) {
                import(
                    /* webpackChunkName: "modules/chatExtras/lightDesignChatHistory" */ './assets/lightDesignChatHistory'
                ).then(({ default: addLightChatDesign }) => {
                    if (location.pathname.includes('alliance_chats'))
                        addLightChatDesign(false, '');

                    LSSM.$stores.event.addListener({
                        name: 'redesign-finished-loading',
                        listener(e: CustomEvent) {
                            if (e.detail.type === 'chat') {
                                (window[PREFIX] as Vue).$nextTick(() =>
                                    addLightChatDesign(
                                        location.pathname === '/',
                                        e.detail.modalName
                                    )
                                );
                            }
                        },
                    });
                });
            }
        });
    } else if (window.location.pathname.startsWith('/missions/')) {
        getSetting('userSelection').then(userSelection => {
            if (userSelection) {
                import(
                    /* webpackChunkName: "modules/chatExtras/userSelection" */ './assets/userSelection'
                ).then(({ default: userSelection }) => userSelection(LSSM));
            }
        });
    }
}) as ModuleMainFunction;
