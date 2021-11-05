import { AddCollapsableButton } from './assets/collapsableMissions/missionlist';
import { AddStarrableButton } from './assets/starrableMissions/missionlist';
import { ModuleMainFunction } from 'typings/Module';

interface AppendableListSetting<valueType> {
    value: valueType;
    enabled: boolean;
}

export default (async (LSSM, MODULE_ID, $m) => {
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
        `${MODULE_ID}_starrable-missions_btn`
    );

    if (window.location.pathname.match(/^\/missions\/\d+\/?/)) {
        if (starrableMissions) {
            (
                await import(
                    /* webpackChunkName: "modules/extendedCallList/starrableMissions/mission" */ './assets/starrableMissions/mission'
                )
            ).default(LSSM, MODULE_ID, starredMissions, starredMissionBtnClass);
        }
        return;
    }

    const collapsableMissions = await getSetting('collapsableMissions');

    if (starrableMissions || collapsableMissions) {
        LSSM.$store.commit('useFontAwesome');

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

        const collapsedMissions = (
            (await getSetting<string[]>('collapsedMissions')) ?? []
        ).filter(
            missionId => !!document.getElementById(`mission_${missionId}`)
        );
        const allMissionsCollapsed =
            (await getSetting<boolean>('allMissionsCollapsed')) ?? false;
        await LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'collapsedMissions',
            value: collapsedMissions,
        });
        const collapsedMissionBtnClass = LSSM.$store.getters.nodeAttribute(
            `${MODULE_ID}_collapsable-missions_btn`
        );
        const addCollapsableBtn: AddCollapsableButton | null = collapsableMissions
            ? (
                  await import(
                      /* webpackChunkName: "modules/extendedCallList/collapsableMissions" */ './assets/collapsableMissions/missionlist'
                  )
              ).default(
                  LSSM,
                  MODULE_ID,
                  collapsedMissions,
                  allMissionsCollapsed,
                  collapsedMissionBtnClass,
                  $m
              )
            : null;

        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/utils/btnGroup" */ './assets/utils/buttonGroup'
            )
        ).default(LSSM, MODULE_ID, mission => {
            addStarrableBtn?.(mission, starredMissionBtnClass);
            addCollapsableBtn?.(mission, collapsedMissionBtnClass);
        });
    }

    if (await getSetting('remainingTime')) {
        await (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingTime" */ './assets/remainingTime'
            )
        ).default(LSSM, await getSetting('remainingTimeGreenOnly'));
    }

    if (await getSetting('remainingPatientTime')) {
        await (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingPatientTime" */ './assets/remainingPatientTime'
            )
        ).default(LSSM);
    }

    if (await getSetting('remainingPumpingTime')) {
        await (
            await import(
                /* webpackChunkName: "modules/extendedCallList/remainingPumpingTime" */ './assets/remainingPumpingTime'
            )
        ).default(LSSM);
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
