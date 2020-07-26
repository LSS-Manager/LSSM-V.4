import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';

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

    const alerts = await LSSM.$store.dispatch('settings/getSetting', {
        moduleId: MODULE_ID,
        settingId: 'alerts',
    });

    console.log(alerts);
    await LSSM.$store.dispatch('notifications/sendNotification', {
        title: 'Test',
        text: 'Des is en Text hier :)',
    });
})(window[PREFIX] as Vue);
