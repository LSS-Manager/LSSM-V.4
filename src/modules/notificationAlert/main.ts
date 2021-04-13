import { ModuleMainFunction } from 'typings/Module';
import { NotificationSetting } from 'typings/modules/NotificationAlert';
import {
    AllianceChatMessage,
    MissionMarkerAdd,
    RadioMessage,
} from 'typings/Ingame';

export default (async (LSSM, MODULE_ID, $m, $mc) => {
    const alerts = (
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'alerts',
        })
    ).value as NotificationSetting[];

    const events = {} as {
        [event: string]: {
            alertStyle: NotificationSetting['alertStyle'];
            duration: NotificationSetting['duration'];
            ingame: NotificationSetting['ingame'];
            desktop: NotificationSetting['desktop'];
            position: NotificationSetting['position'];
        }[];
    };
    alerts.forEach(alert =>
        alert.events.forEach(event => {
            if (!events.hasOwnProperty(event)) events[event] = [];
            events[event].push({
                alertStyle: alert.alertStyle,
                duration: alert.duration,
                ingame: alert.ingame,
                desktop: alert.desktop,
                position: alert.position,
            });
        })
    );

    // Chat messages
    const chatEvents = [
        'allianceChat',
        'allianceChatMention',
        'allianceChatWhisper',
    ].filter(ce => events.hasOwnProperty(ce));
    if (chatEvents.length) {
        await LSSM.$store.dispatch('hook', {
            event: 'allianceChat',
            callback({
                message,
                whisper,
                user_id,
                username,
                mission_id,
                mission_caption,
            }: AllianceChatMessage) {
                if (user_id === window.user_id) return;
                const ucmsg = message.toUpperCase();
                const ucun = window.username.toUpperCase();
                const isWhispered = whisper === window.user_id;
                const isMentioned = !!(
                    !whisper &&
                    (ucmsg.match(
                        new RegExp(
                            `@(${LSSM.$utils.escapeRegex(ucun)}|all[ :])`
                        )
                    ) ||
                        (ucmsg.match(/@admin/) &&
                            (window.alliance_admin || window.alliance_coadmin)))
                );
                const title = `${
                    mission_id ? '🔔 ' : ''
                }<a href="/profile/${user_id}" class="lightbox-open">${username}</a>${
                    mission_id
                        ? `: [<a href="/missions/${mission_id}" class="lightbox-open">${mission_caption}</a>]`
                        : ``
                }`;
                if (isWhispered) {
                    events['allianceChatWhisper'].forEach(async alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: `🔇 ${title}`,
                            text: message,
                            icon: (
                                await import(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    /* webpackChunkName: "modules/notificationAlert/chat" */ './assets/chat.svg'
                                )
                            ).default,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id) {
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                                }
                            },
                        })
                    );
                } else if (isMentioned) {
                    events['allianceChatMention'].forEach(async alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: `ℹ️ ${title}`,
                            text: message,
                            icon: (
                                await import(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    /* webpackChunkName: "modules/notificationAlert/chat" */ './assets/chat.svg'
                                )
                            ).default,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id) {
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                                }
                            },
                        })
                    );
                } else {
                    events['allianceChat']?.forEach(async alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title,
                            text: message,
                            icon: (
                                await import(
                                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                    // @ts-ignore
                                    /* webpackChunkName: "modules/notificationAlert/chat-2" */ './assets/chat-2.svg'
                                )
                            ).default,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id) {
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                                }
                            },
                        })
                    );
                }
            },
        });
    }

    // Radio messages
    const fmsEvents = [
        'vehicle_fms',
        'vehicle_fms_0',
        'vehicle_fms_1',
        'vehicle_fms_2',
        'vehicle_fms_3',
        'vehicle_fms_4',
        'vehicle_fms_5',
        'vehicle_fms_6',
        'vehicle_fms_7',
        'vehicle_fms_8',
        'vehicle_fms_9',
        'sicherheitswache_success',
        'sicherheitswache_error',
    ].filter(ce => events.hasOwnProperty(ce));
    if (fmsEvents.length) {
        await LSSM.$store.dispatch('hook', {
            event: 'radioMessage',
            async callback(message: RadioMessage) {
                if (message.user_id !== window.user_id) return;

                // sicherheitswache
                const siwa_success = fmsEvents.includes(
                    'sicherheitswache_success'
                );
                const siwa_error = fmsEvents.includes('sicherheitswache_error');
                if (
                    (siwa_success || siwa_error) &&
                    message.type === 'sicherheitswache'
                ) {
                    const mode = message.success
                        ? 'sicherheitswache_success'
                        : 'sicherheitswache_error';
                    if (
                        (siwa_success && message.success) ||
                        (siwa_error && !message.success)
                    ) {
                        events[mode].forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title: $m(`events.${mode}`).toString(),
                                    text: window.I18n.t(`javascript.${mode}`, {
                                        caption: message.caption,
                                        credits: message.credits,
                                    }),
                                    icon: `/images/clock_${
                                        message.success ? 'gruen' : 'rot'
                                    }.png`,
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                }
                            )
                        );
                    }
                }

                const fmsAll = fmsEvents.includes('vehicle_fms');
                const fmsStatuses = fmsEvents.filter(e =>
                    e.match(/vehicle_fms_\d+/)
                );
                if (
                    (fmsAll || fmsStatuses.length) &&
                    message.type === 'vehicle_fms'
                ) {
                    const icon = (
                        await import(
                            /* webpackChunkName: "modules/notificationAlert/fmsImage" */ './assets/fmsImage'
                        )
                    ).default(message.fms_real, message.fms);
                    const mode = `vehicle_fms_${message.fms}`;
                    const title = $m(`messages.radioMessage.title`, {
                        vehicle: message.caption,
                        status: message.fms,
                    }).toString();
                    const clickHandler = () =>
                        window.lightboxOpen(`/vehicles/${message.id}`);
                    if (fmsStatuses.includes(mode)) {
                        events[mode].forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title,
                                    text:
                                        message.additionalText ||
                                        message.fms_text,
                                    icon,
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                    clickHandler,
                                }
                            )
                        );
                    } else if (fmsAll) {
                        events['vehicle_fms'].forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title,
                                    text:
                                        message.additionalText ||
                                        message.fms_text,
                                    icon,
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                    clickHandler,
                                }
                            )
                        );
                    }
                }
            },
        });
    }

    // Private direct messages
    if (events['dm']) {
        await LSSM.$store.dispatch('hook', {
            event: 'messageUnreadUpdate',
            post: false,
            callback(amount: string) {
                const newAmount = parseInt(amount);
                const prevAmount = parseInt(
                    document
                        .getElementById('message_top')
                        ?.textContent?.trim() || '-1'
                );
                if (newAmount <= prevAmount) return;
                events['dm'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $mc('messages.dm.title', newAmount - prevAmount),
                        text: $mc('messages.dm.body', newAmount),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/message" */ './assets/message.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/messages');
                        },
                    })
                );
            },
        });
    }

    // Ingame news (Blog, Facebook)
    if (events['ingame_news']) {
        await LSSM.$store.dispatch('hook', {
            event: 'newsNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['ingame_news'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.ingame_news.title'),
                        text: $m('messages.ingame_news.body'),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/google_news" */ './assets/google_news.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                    })
                );
            },
        });
    }

    // Alliance Cadidature
    if (events['allianceCandidature']) {
        await LSSM.$store.dispatch('hook', {
            event: 'allianceCandidatureCount',
            post: false,
            callback(amount: string) {
                const newAmount = parseInt(amount);
                const prevAmount = parseInt(
                    document
                        .getElementById('alliance_candidature_count')
                        ?.textContent?.trim()
                        ?.replace(/(^\()|\)$/g, '') || '-1'
                );
                if (newAmount <= prevAmount) return;
                events['allianceCandidature'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $mc(
                            'messages.allianceCandidature.title',
                            newAmount - prevAmount
                        ),
                        text: $mc(
                            'messages.allianceCandidature.body',
                            newAmount
                        ),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/alliance" */ './assets/alliance.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/verband/bewerbungen');
                        },
                    })
                );
            },
        });
    }

    // Alliance messages
    if (events['allianceMessage']) {
        await LSSM.$store.dispatch('hook', {
            event: 'allianceMessageNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceMessage'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceMessage.title'),
                        text: $m('messages.allianceMessage.body'),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/alliance" */ './assets/alliance.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/alliance_messages');
                        },
                    })
                );
            },
        });
    }

    // Alliance news
    if (events['allianceNews']) {
        await LSSM.$store.dispatch('hook', {
            event: 'allianceNewsNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceNews'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceNews.title'),
                        text: $m('messages.allianceNews.body'),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/alliance" */ './assets/alliance.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/verband/news');
                        },
                    })
                );
            },
        });
    }

    // Alliance Forum
    if (events['allianceForum']) {
        await LSSM.$store.dispatch('hook', {
            event: 'allianceForumNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceForum'].forEach(async alert =>
                    LSSM.$store.dispatch('notifications/sendNotification', {
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceForum.title'),
                        text: $m('messages.allianceForum.body'),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/alliance" */ './assets/alliance.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/alliance_threads');
                        },
                    })
                );
            },
        });
    }

    // Mission messages
    const missionEvents = [
        'mission_new',
        'mission_share',
        'mission_getred',
        'mission_getred_alliance',
        'mission_new_largescale',
        // TODO: mission_siwa_warning(_alliance)?
        // 'mission_siwa_warning',
        // 'mission_siwa_warning_alliance',
    ].filter(ce => events.hasOwnProperty(ce));
    if (missionEvents.length) {
        await LSSM.$store.dispatch('hook', {
            event: 'missionMarkerAdd',
            post: false,
            callback(mission: MissionMarkerAdd) {
                const color = ['red', 'yellow', 'green'][
                    mission.vehicle_state
                ] as 'red' | 'yellow' | 'green';
                // mission_getred(_alliance)? | mission_new
                const missionElement = document.getElementById(
                    `mission_${mission.id}`
                );
                const isAllianceMission = mission.user_id !== window.user_id;
                const isAllianceOnlyMission =
                    mission.mtid === null ||
                    Object.values(LSSM.$t('only_alliance_missions')).includes(
                        mission.mtid
                    );
                const icon =
                    (mission.mtid !== null
                        ? window.mission_graphics[mission.mtid]?.[
                              mission.vehicle_state
                          ]
                        : 0) || `/images/${mission.icon}.png`;
                const isEventMission =
                    isAllianceMission && mission.user_id === null;
                let { caption } = mission;
                if (isAllianceMission) caption = `📤 ${caption}`;
                if (color === 'red') {
                    if (!missionElement && !isAllianceMission) {
                        events['mission_new']?.forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title: caption,
                                    text: mission.address,
                                    icon,
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                    clickHandler() {
                                        window.lightboxOpen(
                                            `/missions/${mission.id}`
                                        );
                                    },
                                }
                            )
                        );
                    } else if (missionElement) {
                        events[
                            `mission_getred${
                                isAllianceMission ? '_alliance' : ''
                            }`
                        ]?.forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title: caption,
                                    text: $m(
                                        `messages.mission_getred${
                                            isAllianceMission ? '_alliance' : ''
                                        }.body`,
                                        {
                                            address: mission.address,
                                        }
                                    ),
                                    icon,
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                    clickHandler() {
                                        window.lightboxOpen(
                                            `/missions/${mission.id}`
                                        );
                                    },
                                }
                            )
                        );
                    }
                }
                if (
                    isAllianceOnlyMission &&
                    !isEventMission &&
                    !missionElement
                ) {
                    events['mission_new_largescale']?.forEach(alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: caption,
                            text: mission.address,
                            icon,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                window.lightboxOpen(`/missions/${mission.id}`);
                            },
                        })
                    );
                } else if (isAllianceMission && !missionElement) {
                    events['mission_share']?.forEach(alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: caption,
                            text: mission.address,
                            icon,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                window.lightboxOpen(`/missions/${mission.id}`);
                            },
                        })
                    );
                }
            },
        });
    }
}) as ModuleMainFunction;
