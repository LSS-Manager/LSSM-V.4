import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';
import { NotificationSetting } from 'typings/modules/NotificationAlert';
import { AllianceChatMessage, RadioMessage } from 'typings/Ingame';

(async (LSSM: Vue) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
            alerts: {
                type: 'appendable-list',
                default: [],
                listItemComponent: settingsItem,
                titleComponent: settingTitles,
                defaultItem: {
                    events: [],
                    alertStyle: 'success',
                    duration: 8000,
                    ingame: true,
                    desktop: true,
                    position: 'bottom right',
                },
            },
        },
    });

    const alerts = (await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'alerts',
    })) as NotificationSetting[];

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
    if (chatEvents.length)
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
                const title = `<a href="/profile/${user_id}" class="lightbox-open">${username}</a>${
                    mission_id
                        ? `: [<a href="/missions/${mission_id}" class="lightbox-open">${mission_caption}</a>]`
                        : ``
                }`;
                if (isWhispered)
                    events['allianceChatWhisper'].forEach(alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: `🔇 ${title}`,
                            text: message,
                            icon: '', // TODO: Chat Icon
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id)
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                            },
                        })
                    );
                else if (isMentioned)
                    events['allianceChatMention'].forEach(alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title: `ℹ️ ${title}`,
                            text: message,
                            icon: '', // TODO: Chat Icon
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id)
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                            },
                        })
                    );
                else
                    events['allianceChat'].forEach(alert =>
                        LSSM.$store.dispatch('notifications/sendNotification', {
                            group: alert.position,
                            type: alert.alertStyle,
                            title,
                            text: message,
                            icon: '', // TODO: Chat Icon
                            duration: alert.duration,
                            ingame: alert.ingame,
                            desktop: alert.desktop,
                            clickHandler() {
                                if (mission_id)
                                    window.lightboxOpen(
                                        `/missions/${mission_id}`
                                    );
                            },
                        })
                    );
            },
        });

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
    if (fmsEvents.length)
        await LSSM.$store.dispatch('hook', {
            event: 'radioMessage',
            callback(message: RadioMessage) {
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
                    )
                        events[mode].forEach(alert =>
                            LSSM.$store.dispatch(
                                'notifications/sendNotification',
                                {
                                    group: alert.position,
                                    type: alert.alertStyle,
                                    title: LSSM.$t(
                                        `modules.${MODULE_ID}.events.${mode}`
                                    ).toString(),
                                    text: window.I18n.t(`javascript.${mode}`, {
                                        caption: message.caption,
                                        credits: message.credits,
                                    }),
                                    icon: '', // TODO: SiWa Icon
                                    duration: alert.duration,
                                    ingame: alert.ingame,
                                    desktop: alert.desktop,
                                }
                            )
                        );
                }
            },
        });
})(window[PREFIX] as Vue);
