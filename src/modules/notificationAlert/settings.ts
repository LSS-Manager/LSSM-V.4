import settingsItem from './components/settings-item.vue';
import settingTitles from './components/settings-titles.vue';

export default (): unknown => ({
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
});
