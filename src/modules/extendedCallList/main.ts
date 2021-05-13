import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <type = boolean>(settingId: string): Promise<type> => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    if (window.location.pathname.match(/^\/vehicles\/\d+\/?/)) {
        return await (
            await import(
                /* webpackChunkName: "modules/extendedCallList/vehicleMissionParticipitationState" */ './assets/vehicleMissionParticipitationState'
            )
        ).default(LSSM, MODULE_ID);
    }

    const starrableMissions = await getSetting('starrableMissions');

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?/) &&
        starrableMissions
    ) {
        return (
            await import(
                /* webpackChunkName: "modules/extendedCallList/starrableMissions/mission" */ './assets/starrableMissions/mission'
            )
        ).default(LSSM, MODULE_ID);
    }

    if (starrableMissions) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/starrableMissions/missionlist" */ './assets/starrableMissions/missionlist'
            )
        ).default(
            LSSM,
            (await getSetting<string[]>('starredMissions')) ?? [],
            MODULE_ID
        );
    }

    if (await getSetting('remainingTime')) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingTime" */ './assets/remainingTime'
            )
        ).default(LSSM, await getSetting('remainingTimeGreenOnly'));
    }

    if (await getSetting('averageCredits')) {
        await LSSM.$store.dispatch('api/getMissions', {
            force: false,
            feature: 'ecl-averageCredits',
        });
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/averageCredits" */ './assets/averageCredits'
            )
        ).default(LSSM);
    }
}) as ModuleMainFunction;
