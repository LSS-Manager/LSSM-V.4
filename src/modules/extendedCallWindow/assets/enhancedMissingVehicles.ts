import enhancedMissingVehicles from '../components/enhancedMissingVehicles/EMVComponent.vue';

import type { $m, ModuleMainFunction } from 'typings/Module';

export default (
    LSSM: Vue,
    getSetting: Parameters<ModuleMainFunction>[0]['getSetting'],
    $m: $m
): void => {
    const missingDialog =
        document.querySelector<HTMLDivElement>('#missing_text');
    if (!missingDialog) return;

    import(
        /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles/getMissingRequirements"*/ './emv/getMissingRequirements'
    ).then(async ({ default: getMissingRequirements }) => {
        const props = getMissingRequirements(
            LSSM,
            missingDialog,
            await LSSM.$stores.newApi.getMissionType(
                LSSM.$utils.getMissionTypeInMissionWindow(),
                'ecw-emv'
            ),
            $m
        );
        if (!props) return;
        getSetting('pushRight', false).then(pushedRight => {
            if (pushedRight) {
                document
                    .querySelector<HTMLFormElement>('#mission-form')
                    ?.prepend(missingDialog);
            }
            new LSSM.$vue({
                pinia: LSSM.$pinia,
                i18n: LSSM.$i18n,
                render: h =>
                    h(enhancedMissingVehicles, {
                        props,
                    }),
            }).$mount(missingDialog);
        });
    });
};
