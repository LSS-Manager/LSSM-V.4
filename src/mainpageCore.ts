import he from 'he';

import loadingIndicatorStorageKey from '../build/plugins/LoadingProgressPluginStorageKey';
import LSSMMenu from './LSSM-Menu.vue';
import telemetry from './modules/telemetry/main';

import type { Building } from 'typings/Building';
import type { BuildingMarkerAdd, RadioMessage } from 'typings/Ingame';
import type { Color, Hidden, Toggle } from 'typings/Setting';

export default async (LSSM: Vue): Promise<void> => {
    window.console.info(
        `Running %cLSSM%c in Version %c${VERSION}%c`,
        'font-weight: bold;',
        'font-weight: normal;',
        'font-style: italic;'
    );

    require('./natives/betterFooterLinks');

    const indicatorWrapper = document.createElement('li') as HTMLLIElement;
    document
        .querySelector('.navbar-default .navbar-right')
        ?.appendChild(indicatorWrapper);

    LSSM.$store.commit(
        'updateCredits',
        LSSM.$utils.getNumberFromText(
            document
                .querySelector<HTMLSpanElement>('.credits-value')
                ?.textContent?.trim() ?? '-1'
        )
    );
    await LSSM.$store.dispatch('hook', {
        event: 'creditsUpdate',
        callback(credits: number) {
            if (credits !== LSSM.$store.state.credits)
                LSSM.$store.commit('updateCredits', credits);
        },
    });
    LSSM.$store.commit(
        'updateCoins',
        LSSM.$utils.getNumberFromText(
            document
                .querySelector<HTMLSpanElement>('.coins-value')
                ?.textContent?.trim() ?? '-1'
        )
    );
    await LSSM.$store.dispatch('hook', {
        event: 'coinsUpdate',
        callback(coins: number) {
            if (coins !== LSSM.$store.state.coins)
                LSSM.$store.commit('updateCoins', coins);
        },
    });

    LSSM.$store
        .dispatch('settings/register', {
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
                    default: LSSM.$store.state.policechief
                        ? '#004997'
                        : '#C9302C',
                },
                iconBgAsNavBg: <Toggle>{
                    type: 'toggle',
                    default: false,
                },
                osmDarkTooltip: <Toggle>{
                    type: 'toggle',
                    default: LSSM.$store.state.darkmode,
                    noMapkit: true,
                    disabled: () => !LSSM.$store.state.darkmode,
                },
                osmDarkControls: <Toggle>{
                    type: 'toggle',
                    default: LSSM.$store.state.darkmode,
                    noMapkit: true,
                    disabled: () => !LSSM.$store.state.darkmode,
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
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h => h(LSSMMenu),
            }).$mount(indicatorWrapper);

            if (
                new Date() >= new Date('2021-11-20T00:00') &&
                new Date() < new Date('2021-11-29T00:00')
            ) {
                LSSM.$store
                    .dispatch('settings/getSetting', {
                        moduleId: 'global',
                        settingId: 'anniversary1Clicked',
                        defaultValue: false,
                    })
                    .then((clicked: boolean) => {
                        if (!clicked) {
                            import(
                                /* webpackChunkName: "components/anniversary" */ './components/anniversary.vue'
                            ).then(({ default: anniversary }) => {
                                const anniversaryWrapper =
                                    document.createElement('div');
                                document.body.append(anniversaryWrapper);
                                new LSSM.$vue({
                                    store: LSSM.$store,
                                    i18n: LSSM.$i18n,
                                    render: h => h(anniversary),
                                }).$mount(anniversaryWrapper);
                            });
                        }
                    });
            }

            LSSM.$store
                .dispatch('settings/getSetting', {
                    moduleId: 'global',
                    settingId: 'osmDarkTooltip',
                    default: true,
                })
                .then(
                    allowDark =>
                        !allowDark &&
                        document.body.classList.add('leaflet-no-dark-tooltip')
                );

            LSSM.$store
                .dispatch('settings/getSetting', {
                    moduleId: 'global',
                    settingId: 'osmDarkControls',
                    default: true,
                })
                .then(
                    allowDark =>
                        allowDark &&
                        document.body.classList.add('leaflet-dark-controls')
                );

            LSSM.$store
                .dispatch('settings/getSetting', {
                    moduleId: 'global',
                    settingId: 'loadingIndicator',
                    default: true,
                })
                .then(loadingIndicator =>
                    localStorage.setItem(
                        loadingIndicatorStorageKey,
                        loadingIndicator
                    )
                );
        });

    if (!window.location.search.includes('mapview=true') && !window.mapkit) {
        LSSM.$store
            .dispatch('addOSMControl', { position: 'top-left' })
            .then((control: HTMLAnchorElement) => {
                LSSM.$store.commit('useFontAwesome');
                const icon = document.createElement('i');
                icon.classList.add('fas', 'fa-expand-arrows-alt');
                control.append(icon);
                control.style.setProperty('cursor', 'pointer');
                LSSM.$store
                    .dispatch('api/registerSettings', {
                        feature: 'mainpage-core_map-expand',
                    })
                    .then(() =>
                        control.addEventListener('click', () => {
                            window.mapExpand(
                                LSSM.$store.state.api.settings.design_mode >= 3
                            );
                        })
                    );
                document
                    .querySelector<HTMLDivElement>('.map-expand-button')
                    ?.remove();
            });
    }

    telemetry(LSSM, settingId => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: 'global',
            settingId,
        });
    });
    import(
        /* webpackChunkName: "releasenotes/main" */
        `./modules/releasenotes/main`
    ).then(module => module.default(LSSM));
    // TODO: Load core modules: [support] ← Will be done in a more efficient way than polling

    await LSSM.$store.dispatch('hook', {
        event: 'radioMessage',
        post: false,
        callback(radioMessage: RadioMessage) {
            if (
                radioMessage.type === 'vehicle_fms' &&
                radioMessage.user_id === window.user_id
            )
                LSSM.$store.commit('api/setVehicleState', radioMessage);
        },
    });

    await LSSM.$store.dispatch('api/initialUpdate', {
        type: 'buildings',
        feature: 'mainpageCore-initial_update',
    });

    await LSSM.$store.dispatch('api/getMissions', {
        force: true,
        feature: 'mainpageCore-initial_update',
    });

    await LSSM.$store.dispatch('hook', {
        event: 'buildingMarkerAdd',
        callback(buildingMarker: BuildingMarkerAdd) {
            if (buildingMarker.user_id !== window.user_id) return;
            const buildings = LSSM.$store.state.api.buildings as Building[];
            const building = buildings.find(
                ({ id }) => id === buildingMarker.id
            );
            if (
                !building ||
                building.caption !== he.decode(buildingMarker.name)
            ) {
                LSSM.$store
                    .dispatch('api/fetchBuilding', {
                        id: buildingMarker.id,
                        feature: 'mainpageCore-buildingMarkerAdd',
                    })
                    .then(building =>
                        LSSM.$store
                            .dispatch('api/fetchVehiclesAtBuilding', {
                                id: building.id,
                                feature: 'mainpageCore-buildingMarkerAdd',
                            })
                            .then(
                                async () =>
                                    await LSSM.$store.dispatch(
                                        'event/dispatchEvent',
                                        await LSSM.$store.dispatch(
                                            'event/createEvent',
                                            {
                                                name: 'buildingMarkerAdd',
                                                detail: {
                                                    marker: buildingMarker,
                                                    building,
                                                },
                                            }
                                        )
                                    )
                            )
                    );
            }
        },
    });
};
