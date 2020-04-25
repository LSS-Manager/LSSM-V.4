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
                eventType: 'Joa',
                alertStyle: 'info',
                duration: 8000,
                ingame: true,
                desktop: true,
            },
        },
    },
});
