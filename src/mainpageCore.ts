import { Color, Toggle } from 'typings/Setting';
import LSSMMenu from './LSSM-Menu.vue';
import telemetry from './modules/telemetry/main';
import { BuildingMarkerAdd, RadioMessage } from 'typings/Ingame';
import { Building } from 'typings/Building';

export default async (LSSM: Vue): Promise<void> => {
    window.console.info(
        `Running %cLSSM%c in Version %c${VERSION}%c`,
        'font-weight: bold;',
        'font-weight: normal;',
        'font-style: italic;'
    );

    const indicatorWrapper = document.createElement('li') as HTMLLIElement;
    document
        .querySelector('.navbar-default .navbar-right')
        ?.appendChild(indicatorWrapper);

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
            },
        })
        .then(() => {
            new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h => h(LSSMMenu),
            }).$mount(indicatorWrapper);

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
        });

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

    await LSSM.$store.dispatch('hook', {
        event: 'buildingMarkerAdd',
        callback(buildingMarker: BuildingMarkerAdd) {
            if (buildingMarker.user_id !== window.user_id) return;
            const buildings = LSSM.$store.state.api.buildings as Building[];
            const building = buildings.find(
                ({ id }) => id === buildingMarker.id
            );
            if (!building || building.caption !== buildingMarker.name) {
                LSSM.$store
                    .dispatch('api/fetchBuilding', {
                        id: buildingMarker.id,
                        feature: 'core-buildingMarkerAdd',
                    })
                    .then(building =>
                        LSSM.$store
                            .dispatch('api/fetchVehiclesAtBuilding', {
                                id: building.id,
                                feature: 'core-buildingMarkerAdd',
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
