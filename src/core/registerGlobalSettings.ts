import type { Color, Hidden, Select, Toggle } from 'typings/Setting';

export default (LSSM: Vue) =>
    LSSM.$stores.settings
        .registerModule({
            moduleId: 'global',
            settings: {
                labelInMenu: <Toggle>{
                    type: 'toggle',
                    default: false,
                },
                allowTelemetry: <Toggle>{
                    type: 'toggle',
                    default: true,
                },
                iconBg: <Color>{
                    type: 'color',
                    default: LSSM.$stores.root.isPoliceChief
                        ? '#004997'
                        : '#C9302C',
                },
                iconBgAsNavBg: <Toggle>{
                    type: 'toggle',
                    default: false,
                },
                osmDarkTooltip: <Toggle>{
                    type: 'toggle',
                    default: LSSM.$stores.root.isDarkMode,
                    noMapkit: true,
                    disabled: () => !LSSM.$stores.root.isDarkMode,
                },
                osmDarkControls: <Toggle>{
                    type: 'toggle',
                    default: LSSM.$stores.root.isDarkMode,
                    noMapkit: true,
                    disabled: () => !LSSM.$stores.root.isDarkMode,
                },
                v3MenuAsSubmenu: <Toggle>{
                    type: 'toggle',
                    default: false,
                },
                anniversary1Clicked: <Hidden>{
                    type: 'hidden',
                },
                loadingIndicator: <Toggle>{
                    type: 'toggle',
                    default: true,
                },
                debugMode: <Toggle>{
                    type: 'toggle',
                    default: false,
                },
                branch: <Select>{
                    type: 'select',
                    default: BRANCH,
                    values: [BRANCH],
                    labels: [BRANCH],
                },
            },
        })
        .then(() => {
            localStorage.setItem(`${PREFIX}_branch`, BRANCH);
            return LSSM.$stores.settings.setSetting({
                moduleId: 'global',
                settingId: 'branch',
                value: BRANCH,
            });
        });
