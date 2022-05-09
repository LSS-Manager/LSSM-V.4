import enhancedMissingVehicles from '../components/enhancedMissingVehicles/emv.vue';

import type { $m } from 'typings/Module';

export default (LSSM: Vue, MODULE_ID: string, $m: $m): void => {
    const missingDialog =
        document.querySelector<HTMLDivElement>('#missing_text');
    if (!missingDialog) return;

    import(
        /* webpackChunkName: "modules/extendedCallWindow/enhancedMissingVehicles/getMissingRequirements"*/ './emv/getMissingRequirements'
    ).then(({ default: getReqs }) => {
        const props = getReqs(LSSM, missingDialog.textContent ?? '', $m);
        if (!props) return;
        LSSM.$store
            .dispatch('settings/getSetting', {
                moduleId: MODULE_ID,
                settingId: 'pushRight',
                defaultValue: false,
            })
            .then(pushedRight => {
                if (pushedRight) {
                    document
                        .querySelector<HTMLFormElement>('#mission-form')
                        ?.prepend(missingDialog);
                }
                new LSSM.$vue({
                    store: LSSM.$store,
                    i18n: LSSM.$i18n,
                    render: h =>
                        h(enhancedMissingVehicles, {
                            props,
                        }),
                }).$mount(missingDialog);
            });
    });
};
