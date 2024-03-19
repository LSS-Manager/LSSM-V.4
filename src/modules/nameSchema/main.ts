import type { ModuleMainFunction } from 'typings/Module';
import type PageObject from './assets/pom/base';

type PageObjectConstructor = new (
    ...params: ConstructorParameters<typeof PageObject>
) => PageObject;

export default <ModuleMainFunction>(async moduleParams => {
    const { MODULE_ID, LSSM } = moduleParams;

    await LSSM.$stores.api.getBuildings(MODULE_ID);
    await LSSM.$stores.api.getVehicles(MODULE_ID);

    const urlMap = new Map<
        RegExp,
        {
            (): Promise<PageObjectConstructor>;
        }
    >([
        [
            /^\/buildings\/\d+$/u,
            async () =>
                (
                    await import(
                        /* webpackChunkName: "modules/nameSchema/pom/building_show" */ './assets/pom/building_show'
                    )
                ).default,
        ],
        [
            /^\/buildings\/\d+\/edit$/u,
            async () =>
                (
                    await import(
                        /* webpackChunkName: "modules/nameSchema/pom/building_edit" */ './assets/pom/building_edit'
                    )
                ).default,
        ],
        [
            /^\/vehicles\/\d+$/u,
            async () =>
                (
                    await import(
                        /* webpackChunkName: "modules/nameSchema/pom/vehicle_show" */ './assets/pom/vehicle_show'
                    )
                ).default,
        ],
        [
            /^\/vehicles\/\d+\/edit$/u,
            async () =>
                (
                    await import(
                        /* webpackChunkName: "modules/nameSchema/pom/vehicle_edit" */ './assets/pom/vehicle_edit'
                    )
                ).default,
        ],
    ]);

    for (const [url, pageObject] of Array.from(urlMap.entries())) {
        if (url.test(window.location.pathname)) {
            const modelConstructor = await pageObject();
            const pageModel = new modelConstructor(moduleParams);
            await pageModel.init();
        }
    }
});
