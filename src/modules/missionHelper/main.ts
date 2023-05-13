import missionHelper from './missionHelper.vue';

import type { ModuleMainFunction } from 'typings/Module';

export default (async ({ LSSM, $m, $mc, getSetting, setSetting }) => {
    if (
        !window.location.href.match(/\/missions\/\d+/u) ||
        document.querySelector('.missionNotFound')
    )
        return;
    const doNotLoad = await getSetting('hide_on_Krankentransport').then(
        disabledInSettings => {
            const missionID = parseInt(
                LSSM.$utils.getMissionTypeInMissionWindow()
            );
            const isTransferMissionBool = Object.values(
                LSSM.$t('transfer_missions')
            ).includes(missionID);
            return isTransferMissionBool && disabledInSettings;
        }
    );
    if (doNotLoad) return;

    const clear = document.createElement('div');
    clear.classList.add('clearfix');
    const missionForm =
        document.querySelector<HTMLFormElement>('#mission-form');
    missionForm?.before(clear);

    new LSSM.$vue({
        pinia: LSSM.$pinia,
        i18n: LSSM.$i18n,
        render: h =>
            h(missionHelper, { props: { $m, $mc, getSetting, setSetting } }),
    }).$mount(clear);
}) as ModuleMainFunction;
