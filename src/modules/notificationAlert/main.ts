import type { ModuleMainFunction } from 'typings/Module';
import type { NotificationSetting } from 'typings/modules/NotificationAlert';
import type {
    AllianceChatMessage,
    MissionMarkerAdd,
    RadioMessage,
} from 'typings/Ingame';

export default (async ({ LSSM, $m, $mc, getSetting }) => {
    const alerts = (
        await getSetting<{ value: NotificationSetting[]; enabled: boolean }>(
            'alerts'
        )
    ).value;

    const events = {} as Record<
        string,
        {
            alertStyle: NotificationSetting['alertStyle'];
            duration: NotificationSetting['duration'];
            ingame: NotificationSetting['ingame'];
            desktop: NotificationSetting['desktop'];
            position: NotificationSetting['position'];
        }[]
    >;
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
        LSSM.$stores.root.hook({
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
                        (ucmsg.match(/@admin/u) &&
                            (window.alliance_admin ||
                                window.alliance_coadmin ||
                                window.alliance_owner)))
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
                        LSSM.$stores.notifications.sendNotification({
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
                        LSSM.$stores.notifications.sendNotification({
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
                        LSSM.$stores.notifications.sendNotification({
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
        const extensionCloseCall = await LSSM.$stores.settings.getSetting({
            moduleId: 'generalExtensions',
            settingId: 'extensionCloseCall',
            defaultValue: true,
        });

        LSSM.$stores.root.hook({
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
                            LSSM.$stores.notifications.sendNotification({
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
                            })
                        );
                    }
                }

                const fmsAll = fmsEvents.includes('vehicle_fms');
                const fmsStatuses = fmsEvents.filter(e =>
                    e.match(/vehicle_fms_\d+/u)
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
                    const clickHandler = message.additionalText
                        ? extensionCloseCall
                            ? () => {
                                  window.lightboxOpen(
                                      `/missions/${message.mission_id}`
                                  );
                                  document
                                      .querySelector<HTMLLIElement>(
                                          `.radio_message_vehicle_${message.id}`
                                      )
                                      ?.remove();
                              }
                            : () =>
                                  window.lightboxOpen(
                                      `/missions/${message.mission_id}`
                                  )
                        : () => window.lightboxOpen(`/vehicles/${message.id}`);
                    if (fmsStatuses.includes(mode)) {
                        events[mode].forEach(alert =>
                            LSSM.$stores.notifications.sendNotification({
                                group: alert.position,
                                type: alert.alertStyle,
                                title,
                                text:
                                    message.additionalText || message.fms_text,
                                icon,
                                duration: alert.duration,
                                ingame: alert.ingame,
                                desktop: alert.desktop,
                                clickHandler,
                            })
                        );
                    } else if (fmsAll) {
                        events['vehicle_fms'].forEach(alert =>
                            LSSM.$stores.notifications.sendNotification({
                                group: alert.position,
                                type: alert.alertStyle,
                                title,
                                text:
                                    message.additionalText || message.fms_text,
                                icon,
                                duration: alert.duration,
                                ingame: alert.ingame,
                                desktop: alert.desktop,
                                clickHandler,
                            })
                        );
                    }
                }
            },
        });
    }

    // Private direct messages
    if (events['dm']) {
        LSSM.$stores.root.hook({
            event: 'messageUnreadUpdate',
            post: false,
            callback(amount: string) {
                const newAmount = parseInt(amount);
                const prevAmount = parseInt(
                    document
                        .querySelector<HTMLSpanElement>('#message_top')
                        ?.textContent?.trim() || '-1'
                );
                if (newAmount <= prevAmount) return;
                events['dm'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $mc(
                            'messages.dm.title',
                            newAmount - prevAmount
                        ).toString(),
                        text: $mc('messages.dm.body', newAmount).toString(),
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
        LSSM.$stores.root.hook({
            event: 'newsNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['ingame_news'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.ingame_news.title').toString(),
                        text: $m('messages.ingame_news.body').toString(),
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
        LSSM.$stores.root.hook({
            event: 'allianceCandidatureCount',
            post: false,
            callback(amount: string) {
                const newAmount = parseInt(amount);
                const prevAmount = parseInt(
                    document
                        .querySelector<HTMLSpanElement>(
                            '#alliance_candidature_count'
                        )
                        ?.textContent?.trim()
                        ?.replace(/(^\()|\)$/gu, '') || '-1'
                );
                if (newAmount <= prevAmount) return;
                events['allianceCandidature'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $mc(
                            'messages.allianceCandidature.title',
                            newAmount - prevAmount
                        ).toString(),
                        text: $mc(
                            'messages.allianceCandidature.body',
                            newAmount
                        ).toString(),
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
        LSSM.$stores.root.hook({
            event: 'allianceMessageNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceMessage'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceMessage.title').toString(),
                        text: $m('messages.allianceMessage.body').toString(),
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
        LSSM.$stores.root.hook({
            event: 'allianceNewsNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceNews'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceNews.title').toString(),
                        text: $m('messages.allianceNews.body').toString(),
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
        LSSM.$stores.root.hook({
            event: 'allianceForumNew',
            post: false,
            callback(hasNew: boolean) {
                if (!hasNew) return;
                events['allianceForum'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.allianceForum.title').toString(),
                        text: $m('messages.allianceForum.body').toString(),
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

    // Tasks
    if (events['tasks_update']) {
        LSSM.$stores.root.hook({
            event: 'tasksUpdate',
            post: false,
            callback(amount: number, newTasks: boolean) {
                if (
                    !amount ||
                    newTasks ||
                    document.querySelector<HTMLSpanElement>(
                        '#completed_tasks_counter'
                    )?.textContent === amount.toString()
                )
                    return;
                events['tasks_update'].forEach(async alert =>
                    LSSM.$stores.notifications.sendNotification({
                        group: alert.position,
                        type: alert.alertStyle,
                        title: $m('messages.tasksUpdate.title').toString(),
                        text: $m('messages.tasksUpdate.body').toString(),
                        icon: (
                            await import(
                                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                // @ts-ignore
                                /* webpackChunkName: "modules/notificationAlert/tasks" */ './assets/tasks.svg'
                            )
                        ).default,
                        duration: alert.duration,
                        ingame: alert.ingame,
                        desktop: alert.desktop,
                        clickHandler() {
                            window.lightboxOpen('/tasks/index');
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
        LSSM.$stores.root.hook({
            event: 'missionMarkerAdd',
            post: false,
            callback(mission: MissionMarkerAdd) {
                const color = ['red', 'yellow', 'green'][
                    mission.vehicle_state
                ] as 'green' | 'red' | 'yellow';
                // mission_getred(_alliance)? | mission_new
                const missionElement = document.querySelector<HTMLDivElement>(
                    `#mission_${mission.id}`
                );
                const isAllianceMission = mission.user_id !== window.user_id;
                const isAllianceOnlyMission =
                    mission.mtid === null ||
                    Object.values(LSSM.$t('only_alliance_missions')).includes(
                        mission.mtid
                    );
                const icon =
                    (mission.mission_type
                        ? window.mission_graphics_lookups.generic[
                              mission.mission_type
                          ]
                        : window.mission_graphics_lookups.regular[
                              mission.mtid
                          ])?.[mission.vehicle_state] ||
                    `/images/${mission.icon}.png`;
                const isEventMission =
                    isAllianceMission && mission.user_id === null;
                const { caption, address, id } = mission;
                const processedCaption = isAllianceMission
                    ? `📤 ${caption}`
                    : caption;
                if (color === 'red') {
                    if (!missionElement && !isAllianceMission) {
                        events['mission_new']?.forEach(alert =>
                            LSSM.$stores.notifications.sendNotification({
                                group: alert.position,
                                type: alert.alertStyle,
                                title: processedCaption,
                                text: address,
                                icon,
                                duration: alert.duration,
                                ingame: alert.ingame,
                                desktop: alert.desktop,
                                clickHandler() {
                                    window.lightboxOpen(`/missions/${id}`);
                                },
                            })
                        );
                    } else if (missionElement) {
                        events[
                            `mission_getred${
                                isAllianceMission ? '_alliance' : ''
                            }`
                        ]?.forEach(alert =>
                            LSSM.$stores.notifications.sendNotification({
                                group: alert.position,
                                type: alert.alertStyle,
                                title: processedCaption,
                                text: $m(
                                    `messages.mission_getred${
                                        isAllianceMission ? '_alliance' : ''
                                    }.body`,
                                    {
                                        address,
                                    }
                                ).toString(),
                                icon,
                                duration: alert.duration,
                                ingame: alert.ingame,
                                desktop: alert.desktop,
                                clickHandler() {
                                    window.lightboxOpen(`/missions/${id}`);
                                },
                            })
                        );
                    }
                }
                if (
                    isAllianceOnlyMission &&
                    !isEventMission &&
                    !missionElement
                ) {
                    events['mission_new_largescale']?.forEach(alert =>
                        LSSM.$stores.notifications.sendNotification({
                            group: alert.position,
                            type: alert.alertStyle,
                            title: processedCaption,
                            text: address,
                            icon,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                window.lightboxOpen(`/missions/${id}`);
                            },
                        })
                    );
                } else if (isAllianceMission && !missionElement) {
                    events['mission_share']?.forEach(alert =>
                        LSSM.$stores.notifications.sendNotification({
                            group: alert.position,
                            type: alert.alertStyle,
                            title: processedCaption,
                            text: address,
                            icon,
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                window.lightboxOpen(`/missions/${id}`);
                            },
                        })
                    );
                }
            },
        });
    }
}) as ModuleMainFunction;
