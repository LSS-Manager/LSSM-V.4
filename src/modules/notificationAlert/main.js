import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';

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

const getCallback = ({ event, alertStyle, time }) =>
    ({
        radioMessage(fms) {
            if (fms.type === 'vehicle_fms')
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
                });
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
