import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';

const svgToMiniDataURI = require('mini-svg-data-uri');
const lssmLogo = require('../../img/lssm_logo').default;

window.lssmv4.$store.dispatch('settings/register', {
    moduleId: MODULE_ID,
    settings: {
        alerts: {
            type: 'appendable-list',
            default: [],
            listItemComponent: settingsItem,
            titleComponent: settingTitles,
            defaultItem: {
                eventTypes: [],
                alertStyle: null,
                duration: 8000,
                ingame: true,
                desktop: true,
            },
        },
    },
});

const fmsColors = {
    1: {
        background: '#5a97f3',
        text: 'white',
    },
    2: {
        background: '#77dc81',
        color: 'black',
    },
    3: {
        background: '#f3d470',
        color: 'black',
    },
    4: {
        background: '#f58558',
        color: 'black',
    },
    5: {
        background: '#ff0000',
        color: 'white',
    },
    6: {
        background: '#000000',
        color: 'white',
    },
    7: {
        background: '#ff8600',
        color: 'black',
    },
    9: {
        background: '#f3d470',
        color: 'black',
    },
};

const getCallback = ({ event, alertStyle, time, ingame, desktop }) =>
    ({
        radioMessage(fms) {
            if (fms.type === 'vehicle_fms' && fms.user_id === window.user_id) {
                const colors = fmsColors[fms.fms_real];
                const title = window.lssmv4.$t(
                    'modules.notificationAlert.messages.radioMessage.title',
                    {
                        vehicle: fms.caption,
                        status: fms.fms,
                    }
                );
                const icon = svgToMiniDataURI(
                    `<svg width="50" height="50" overflow="hidden" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g><rect fill="${colors.background}" stroke="#000" stroke-width="0" x="0" y="0" width="50" height="50" stroke-dasharray="none" fill-opacity="1" rx="10%"></rect><text font-size="24" font-weight="bold" transform="matrix(1.77389, 0, 0, 1.77389, -12.8959, -23.9464)" font-family="Helvetica, Arial, sans-serif" y="35.93269" x="14.68916" stroke-width="0" stroke="#000" fill="${colors.color}">${fms.fms}</text></g></svg>`
                );
                ingame &&
                    window.lssmv4.flashMessage.show({
                        status: alertStyle,
                        title,
                        time,
                        message: fms.fms_text,
                        icon,
                    });
                if (desktop) {
                    const n = new Notification(title, {
                        badge: icon,
                        body: fms.fms_text,
                        icon,
                    });
                    n.onclick = () =>
                        window.lightboxOpen(`./vehicles/${fms.id}`);
                    if (time > 0) setTimeout(() => n.close(), time);
                }
            }
        },
        allianceChat(message) {
            if (message.user_id === window.user_id) return;
            const icon = svgToMiniDataURI(
                `<svg width="50" height="50" overflow="hidden" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g><path stroke-opacity="1" style="color: rgb(0, 0, 0);" stroke-width="2" stroke-dasharray="none" stroke-linejoin="round" stroke-linecap="butt" stroke-dashoffset="" fill-rule="nonzero" opacity="1" marker-start="" marker-mid="" marker-end="" id="svg_1" d="M1.2805511951446533,8.593820571899414 L1.2805511951446533,8.593820571899414 C1.2805511951446533,5.741096496582031 3.7620205879211426,3.4285106658935547 6.823072195053101,3.4285106658935547 L9.342403650283813,3.4285106658935547 L9.342403650283813,3.4285106658935547 L21.43518376350403,3.4285106658935547 L44.10913395881653,3.4285106658935547 C45.57911229133606,3.4285106658935547 46.9888756275177,3.972714424133301 48.02828907966614,4.9413933753967285 C49.06771397590637,5.9100751876831055 49.651652574539185,7.223896026611328 49.651652574539185,8.593820571899414 L49.651652574539185,21.507089614868164 L49.651652574539185,21.507089614868164 L49.651652574539185,29.25505256652832 L49.651652574539185,29.25505256652832 C49.651652574539185,32.10777282714844 47.17018437385559,34.42035675048828 44.10913395881653,34.42035675048828 L21.43518376350403,34.42035675048828 L5.637458562850952,47.554542541503906 L9.342403650283813,34.42035675048828 L6.823072195053101,34.42035675048828 C3.7620205879211426,34.42035675048828 1.2805511951446533,32.10777282714844 1.2805511951446533,29.25505256652832 L1.2805511951446533,29.25505256652832 L1.2805511951446533,21.507089614868164 L1.2805511951446533,21.507089614868164 z" fill="none" stroke="#eb1a1a"/>${
                    message.mission_id
                        ? `<foreignObject fill="none" stroke="#eb1a1a" style="color: rgb(0, 0, 0); text-align: center;" stroke-width="2" stroke-linejoin="round" stroke-dashoffset="" fill-rule="nonzero" font-size="25" font-family="Georgia, serif" letter-spacing="0" word-spacing="0" marker-start="" marker-mid="" marker-end="" id="svg_4" x="0.8021015481426339" y="5.436845041079815" width="48.654224481168214" height="26.925246788083573" class=""><p xmlns="http://www.w3.org/1999/xhtml" style="border: none;outline: none;font-size: inherit;line-height: 1em;padding:0;margin:0;">🔔</p></foreignObject>`
                        : ''
                }</g></svg>`
            );
            const body = `${
                message.mission_id ? `🔔[${message.mission_caption}] ` : ''
            }${message.whisper ? `/w ` : ''}${message.message}`;
            ingame &&
                window.lssmv4.flashMessage.show({
                    status: alertStyle,
                    title: message.username,
                    time,
                    message: body,
                    icon,
                });
            if (desktop) {
                const n = new Notification(message.username, {
                    badge: icon,
                    icon,
                    body,
                });
                if (message.mission_id)
                    n.onclick = () =>
                        window.lightboxOpen(`./missions/${message.mission_id}`);
                if (time > 0) setTimeout(() => n.close(), time);
            }
        },
    }[event]);

Notification.requestPermission().then((result) => {
    if (result === 'granted') {
        new Notification(
            window.lssmv4.$t('modules.notificationAlert.initializing'),
            {
                badge: lssmLogo,
                body: window.lssmv4.$t('modules.notificationAlert.initialized'),
                icon: lssmLogo,
            }
        );
        window.lssmv4.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'alerts',
            })
            .then((alerts) => {
                Object.values(alerts).forEach((alert) =>
                    alert.eventTypes.forEach(async (event) => {
                        if (typeof window[event] !== void 0) {
                            await window.lssmv4.$store.dispatch('hook', {
                                event,
                                post: false,
                                callback(details) {
                                    getCallback({
                                        event,
                                        alertStyle: alert.alertStyle,
                                        time: alert.duration,
                                        ingame: alert.ingame,
                                        desktop: alert.desktop,
                                    })(details);
                                },
                            });
                        }
                    })
                );
            });
    }
});
