import he from 'he';

import loadingIndicatorStorageKey from '../build/plugins/LoadingProgressPluginStorageKey';
import LSSMMenu from './LSSM-Menu.vue';
import telemetry from './modules/telemetry/main';

import type { BuildingMarkerAdd, RadioMessage } from 'typings/Ingame';
import type { Color, Hidden, Toggle } from 'typings/Setting';

export default async (LSSM: Vue): Promise<void> => {
    require('./natives/betterFooterLinks');

    const indicatorWrapper = document.createElement('li') as HTMLLIElement;
    document
        .querySelector('.navbar-default .navbar-right')
        ?.appendChild(indicatorWrapper);

    LSSM.$stores.root.updateCredits(
        LSSM.$utils.getNumberFromText(
            document
                .querySelector<HTMLSpanElement>('.credits-value')
                ?.textContent?.trim() ?? '-1'
        )
    );
    LSSM.$stores.root.hook<[number]>({
        event: 'creditsUpdate',
        callback(credits) {
            if (credits !== LSSM.$stores.root.credits)
                LSSM.$stores.root.updateCredits(credits);
        },
    });
    LSSM.$stores.root.updateCoins(
        LSSM.$utils.getNumberFromText(
            document
                .querySelector<HTMLSpanElement>('.coins-value')
                ?.textContent?.trim() ?? '-1'
        )
    );
    LSSM.$stores.root.hook<[number]>({
        event: 'coinsUpdate',
        callback(coins) {
            if (coins !== LSSM.$stores.root.coins)
                LSSM.$stores.root.updateCoins(coins);
        },
    });
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
            },
        })
        .then(() => {
            new LSSM.$vue({
                pinia: LSSM.$pinia,
                i18n: LSSM.$i18n,
                render: h => h(LSSMMenu),
            }).$mount(indicatorWrapper);

            if (
                new Date() >= new Date('2021-11-20T00:00') &&
                new Date() < new Date('2021-11-29T00:00')
            ) {
                LSSM.$stores.settings
                    .getSetting({
                        moduleId: 'global',
                        settingId: 'anniversary1Clicked',
                        defaultValue: false,
                    })
                    .then(clicked => {
                        if (!clicked) {
                            import(
                                /* webpackChunkName: "components/anniversary" */ './components/anniversary.vue'
                            ).then(({ default: anniversary }) => {
                                const anniversaryWrapper =
                                    document.createElement('div');
                                document.body.append(anniversaryWrapper);
                                new LSSM.$vue({
                                    pinia: LSSM.$pinia,
                                    i18n: LSSM.$i18n,
                                    render: h => h(anniversary),
                                }).$mount(anniversaryWrapper);
                            });
                        }
                    });
            }

            LSSM.$stores.settings
                .getSetting({
                    moduleId: 'global',
                    settingId: 'osmDarkTooltip',
                    defaultValue: true,
                })
                .then(
                    allowDark =>
                        !allowDark &&
                        document.body.classList.add('leaflet-no-dark-tooltip')
                );

            LSSM.$stores.settings
                .getSetting({
                    moduleId: 'global',
                    settingId: 'osmDarkControls',
                    defaultValue: true,
                })
                .then(
                    allowDark =>
                        allowDark &&
                        document.body.classList.add('leaflet-dark-controls')
                );

            LSSM.$stores.settings
                .getSetting({
                    moduleId: 'global',
                    settingId: 'loadingIndicator',
                    defaultValue: true,
                })
                .then(loadingIndicator =>
                    localStorage.setItem(
                        loadingIndicatorStorageKey,
                        loadingIndicator.toString()
                    )
                );
        });

    if (!window.location.search.includes('mapview=true') && !window.mapkit) {
        LSSM.$stores.root
            .addOSMControl({ position: 'top-left' })
            .then((control: HTMLAnchorElement) => {
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-expand-arrows-alt');
                control.append(icon);
                control.style.setProperty('cursor', 'pointer');
                LSSM.$stores.api
                    .getSettings('mainPage-core_map-expand')
                    .then(({ value: { design_mode } }) =>
                        control.addEventListener('click', () => {
                            window.mapExpand(design_mode >= 3);
                        })
                    );
                document
                    .querySelector<HTMLDivElement>('.map-expand-button')
                    ?.remove();
            });
    }

    telemetry(LSSM, settingId => {
        return LSSM.$stores.settings.getSetting({
            moduleId: 'global',
            settingId,
        });
    });
    import(
        /* webpackChunkName: "releasenotes/main" */
        `./modules/releasenotes/main`
    ).then(module => module.default(LSSM));
    // TODO: Load core modules: [support] ← Will be done in a more efficient way than polling

    LSSM.$stores.root.hook({
        event: 'radioMessage',
        post: false,
        callback(radioMessage: RadioMessage) {
            if (
                radioMessage.type === 'vehicle_fms' &&
                radioMessage.user_id === window.user_id
            )
                LSSM.$stores.api.radioMessage(radioMessage);
        },
    });

    await LSSM.$stores.api.getBuildings('mainPage-core_initial-update');
    await LSSM.$stores.api.getMissions('mainPage-core_initial-update');

    LSSM.$stores.root.hook({
        event: 'buildingMarkerAdd',
        callback(buildingMarker: BuildingMarkerAdd) {
            if (buildingMarker.user_id !== window.user_id) return;
            const buildings = LSSM.$stores.api.buildings;
            const building = buildings.find(
                ({ id }) => id === buildingMarker.id
            );
            if (
                !building ||
                building.caption !== he.decode(buildingMarker.name)
            ) {
                LSSM.$stores.api
                    .getBuilding(
                        buildingMarker.id,
                        'mainPage-core_buildingMarkerAdd'
                    )
                    .then(building =>
                        LSSM.$stores.api
                            .getVehiclesAtBuilding(
                                building.id,
                                'mainPage-core_buildingMarkerAdd'
                            )
                            .then(() =>
                                LSSM.$stores.event.createAndDispatchEvent({
                                    name: 'buildingMarkerAdd',
                                    detail: {
                                        marker: buildingMarker,
                                        building,
                                    },
                                })
                            )
                    );
            }
        },
    });
};
