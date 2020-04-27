import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';

const svgToMiniDataURI = require('mini-svg-data-uri');

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
                desktop: false,
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

const getCallback = ({ event, alertStyle, time }) =>
    ({
        radioMessage(fms) {
            if (fms.type === 'vehicle_fms') {
                const colors = fmsColors[fms.fms_real];
                window.lssmv4.flashMessage.show({
                    status: alertStyle,
                    title: window.lssmv4.$t(
                        'modules.notificationAlert.messages.radioMessage.title',
                        {
                            vehicle: fms.caption,
                            status: fms.fms,
                        }
                    ),
                    time,
                    message: fms.fms_text,
                    icon: svgToMiniDataURI(
                        `<svg width="50" height="50" overflow="hidden" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><g><rect fill="${colors.background}" stroke="#000" stroke-width="0" x="0" y="0" width="50" height="50" stroke-dasharray="none" fill-opacity="1" rx="10%"></rect><text font-size="24" font-weight="bold" transform="matrix(1.77389, 0, 0, 1.77389, -12.8959, -23.9464)" font-family="Helvetica, Arial, sans-serif" y="35.93269" x="14.68916" stroke-width="0" stroke="#000" fill="${colors.color}">${fms.fms}</text></g></svg>`
                    ),
                });
            }
        },
    }[event]);

window.lssmv4.$store
    .dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'alerts',
    })
    .then(alerts => {
        Object.values(alerts).forEach(alert =>
            alert.eventTypes.forEach(async event => {
                if (typeof window[event] !== void 0) {
                    await window.lssmv4.$store.dispatch('hook', {
                        event,
                        post: false,
                        callback(details) {
                            getCallback({
                                event,
                                alertStyle: alert.alertStyle,
                                time: alert.duration,
                            })(details);
                        },
                    });
                }
            })
        );
    });
