import { AddCollapsableButton } from './assets/collapsableMissions/missionlist';
import { AddStarrableButton } from './assets/starrableMissions/missionlist';
import { ModuleMainFunction } from 'typings/Module';
import { Sort } from './assets/sort';
import { AddShareBtn, UpdateShareBtn } from './assets/shareMissions';

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
                /* webpackChunkName: "modules/extendedCallList/vehicleMissionParticipationState" */ './assets/vehicleMissionParticipationState'
            )
        ).default(LSSM, MODULE_ID);
    }

    const starrableMissions = await getSetting('starrableMissions');
    let starredMissions = (await getSetting<string[]>('starredMissions')) ?? [];

    const starredMissionBtnClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_starrable-missions_btn`
    );
    const starredMissionPanelClass = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_starrable-missions-starred`
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
    const shareMissions = await getSetting('shareMissions');

    if (starrableMissions || collapsableMissions || shareMissions) {
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
                  starredMissionBtnClass,
                  starredMissionPanelClass
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
        const {
            addShareBtn,
            updateShareBtn,
        }: {
            addShareBtn: AddShareBtn | null;
            updateShareBtn: UpdateShareBtn | null;
        } = shareMissions
            ? (
                  await import(
                      /* webpackChunkName: "modules/extendedCallList/shareMissions" */ './assets/shareMissions'
                  )
              ).default(
                  LSSM,
                  MODULE_ID,
                  await getSetting<('' | 'sicherheitswache')[]>(
                      'shareMissionsTypes'
                  ),
                  await getSetting<number>('shareMissionsMinCredits'),
                  await getSetting<string>('shareMissionsButtonColor')
              )
            : { addShareBtn: null, updateShareBtn: null };

        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/utils/btnGroup" */ './assets/utils/buttonGroup'
            )
        ).default(
            LSSM,
            MODULE_ID,
            mission => {
                addStarrableBtn?.(mission, starredMissionBtnClass);
                addCollapsableBtn?.(mission, collapsedMissionBtnClass);
                addShareBtn?.(mission);
            },
            mission => {
                updateShareBtn?.(mission);
            }
        );
    }

    if (await getSetting('sortMissions')) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/sort" */ './assets/sort'
            )
        ).default(
            LSSM,
            MODULE_ID,
            (await getSetting<Sort>('sortMissionsType')) ?? 'default',
            (await getSetting<'asc' | 'desc'>('sortMissionsDirection')) ??
                'asc',
            await getSetting<string>('sortMissionsButtonColor'),
            starredMissionPanelClass,
            $m
        );
    }

    if (await getSetting('currentPatients')) {
        (
            await import(
                /* webpackChunkName: "modules/extendedCallList/currentPatients" */ './assets/currentPatients'
            )
        ).default(
            LSSM,
            MODULE_ID,
            await getSetting('hide0CurrentPatients'),
            await getSetting('currentPatientsInTooltips')
        );
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
