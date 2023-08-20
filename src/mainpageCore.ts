import he from 'he';

import loadingIndicatorStorageKey from '../build/plugins/LoadingProgressPluginStorageKey';
import LSSMMenu from './LSSM-Menu.vue';
import telemetry from './modules/telemetry/main';

import type { BuildingMarkerAdd, RadioMessage } from 'typings/Ingame';

export default async (LSSM: Vue): Promise<void> => {
    require('./natives/betterFooterLinks');

    const indicatorWrapper = document.createElement('li') as HTMLLIElement;
    document
        .querySelector('.navbar-default .navbar-right')
        ?.append(indicatorWrapper);

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

    new LSSM.$vue({
        pinia: LSSM.$pinia,
        i18n: LSSM.$i18n,
        render: h => h(LSSMMenu),
    }).$mount(indicatorWrapper);

    if (new Date() < new Date('2022-11-29T00:00')) {
        import(
            /* webpackChunkName: "components/anniversary" */ './components/anniversaryComponent.vue'
        ).then(({ default: anniversary }) => {
            const anniversaryWrapper = document.createElement('div');
            document.body.append(anniversaryWrapper);
            new LSSM.$vue({
                pinia: LSSM.$pinia,
                i18n: LSSM.$i18n,
                render: h =>
                    h(anniversary, {
                        props: {
                            balloons: true,
                        },
                    }),
            }).$mount(anniversaryWrapper);
        });
    }

    LSSM.$stores.settings
        .getSetting<boolean>({
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
        .getSetting<boolean>({
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
        .getSetting<boolean>({
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

    telemetry(LSSM, <SettingType>(settingId: string) =>
        LSSM.$stores.settings.getSetting<SettingType>({
            moduleId: 'global',
            settingId,
        })
    );
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
    await LSSM.$stores.api.getMissions('mainPage-core_initial-update', true);

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
