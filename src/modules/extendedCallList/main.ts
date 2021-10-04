import { AddStarrableButton } from './assets/starrableMissions/missionlist';
import { ModuleMainFunction } from 'typings/Module';

interface AppendableListSetting<valueType> {
    value: valueType;
    enabled: boolean;
}

export default (async (LSSM, MODULE_ID) => {
    const getSetting = <Type = boolean>(settingId: string): Promise<Type> => {
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
    let starredMissions = (await getSetting<string[]>('starredMissions')) ?? [];

    const starredMissionBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_starrable-mission_btn`
    );

    if (
        window.location.pathname.match(/^\/missions\/\d+\/?/) &&
        starrableMissions
    ) {
        return (
            await import(
                /* webpackChunkName: "modules/extendedCallList/starrableMissions/mission" */ './assets/starrableMissions/mission'
            )
        ).default(LSSM, MODULE_ID, starredMissions, starredMissionBtnClass);
    }

    const collapsableMissions = await getSetting('collapsableMissions');

    if (starrableMissions || collapsableMissions) {
        starredMissions = starredMissions.filter(
            missionId => !!document.getElementById(`mission_${missionId}`)
        );
        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'starredMissions',
            value: starredMissions,
        });

        const addStarrableBtn: AddStarrableButton | null = starrableMissions
            ? (
                  await import(
                      /* webpackChunkName: "modules/extendedCallList/starrableMissions/missionlist" */ './assets/starrableMissions/missionlist'
                  )
              ).default(
                  LSSM,
                  MODULE_ID,
                  starredMissions,
                  starredMissionBtnClass
              )
            : null;

        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/utils/btnGroup" */ './assets/utils/buttonGroup'
            )
        ).default(LSSM, MODULE_ID, mission => {
            addStarrableBtn?.(mission, starredMissionBtnClass);
        });
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

    const eventMissionsSettings = await getSetting<
        AppendableListSetting<
            {
                text: string;
                missions: number[];
            }[]
        >
    >('eventMissions');

    if (eventMissionsSettings.enabled && eventMissionsSettings.value.length) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/eventMissions" */ './assets/eventMissions'
            )
        ).default(LSSM, eventMissionsSettings.value);
    }
}) as ModuleMainFunction;
