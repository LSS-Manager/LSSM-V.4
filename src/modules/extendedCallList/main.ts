import { AddCollapsableButton } from './assets/collapsableMissions/missionlist';
import { AddStarrableButton } from './assets/starrableMissions/missionlist';
import { ModuleMainFunction } from 'typings/Module';
import { Sort } from './assets/sort/callList';
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

    const sortMissions = await getSetting('sortMissions');

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
    const sortBtnId = LSSM.$store.getters.nodeAttribute(
        `${MODULE_ID}_missionlist-sorting_selection-list-btn`
    );

    if (window.location.pathname.match(/^\/missions\/\d+\/?/)) {
        if (starrableMissions) {
            import(
                /* webpackChunkName: "modules/extendedCallList/starrableMissions/mission" */ './assets/starrableMissions/mission'
            ).then(({ default: starrableMissions }) =>
                starrableMissions(
                    LSSM,
                    MODULE_ID,
                    starredMissions,
                    starredMissionBtnClass
                )
            );
        }
        if (sortMissions && (await getSetting('sortMissionsInMissionwindow'))) {
            import(
                /* webpackChunkName: "modules/extendedCallList/sort/mission" */ './assets/sort/mission'
            ).then(async ({ default: sort }) =>
                sort(
                    LSSM,
                    MODULE_ID,
                    $m,
                    (await getSetting<Sort>('sortMissionsType')) ?? 'default',
                    (await getSetting('sortMissionsInMissionwindowChecked')) ??
                        true
                )
            );
        }
        return;
    }

    const collapsableMissions = await getSetting('collapsableMissions');
    const shareMissions = await getSetting('shareMissions');

    if (starrableMissions || collapsableMissions || shareMissions) {
        (async () => {
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
                      sortBtnId,
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
        })().then();
    }

    if (sortMissions) {
        import(
            /* webpackChunkName: "modules/extendedCallList/sort/callList" */ './assets/sort/callList'
        ).then(async ({ default: sort }) =>
            sort(
                LSSM,
                MODULE_ID,
                (await getSetting<Sort>('sortMissionsType')) ?? 'default',
                (await getSetting<'asc' | 'desc'>('sortMissionsDirection')) ??
                    'asc',
                await getSetting<string>('sortMissionsButtonColor'),
                sortBtnId,
                starredMissionPanelClass,
                $m
            )
        );
    }

    if (await getSetting('currentPatients')) {
        import(
            /* webpackChunkName: "modules/extendedCallList/currentPatients" */ './assets/currentPatients'
        ).then(async ({ default: currentPatients }) =>
            currentPatients(
                LSSM,
                MODULE_ID,
                await getSetting('hide0CurrentPatients'),
                await getSetting('currentPatientsInTooltips')
            )
        );
    }

    if (await getSetting('remainingTime')) {
        import(
            /* webpackChunkName: "modules/extendedCallList/remainingTime" */ './assets/remainingTime'
        ).then(async ({ default: remainingTime }) =>
            remainingTime(LSSM, await getSetting('remainingTimeGreenOnly'))
        );
    }

    if (await getSetting('remainingPatientTime')) {
        import(
            /* webpackChunkName: "modules/extendedCallList/remainingPatientTime" */ './assets/remainingPatientTime'
        ).then(({ default: remainingPatientTime }) =>
            remainingPatientTime(LSSM)
        );
    }

    if (await getSetting('remainingPumpingTime')) {
        import(
            /* webpackChunkName: "modules/extendedCallList/remainingPumpingTime" */ './assets/remainingPumpingTime'
        ).then(({ default: remainingPumpingTime }) =>
            remainingPumpingTime(LSSM)
        );
    }

    if (await getSetting('averageCredits')) {
        import(
            /* webpackChunkName: "modules/extendedCallList/averageCredits" */ './assets/averageCredits'
        ).then(({ default: averageCredits }) => {
            LSSM.$store
                .dispatch('api/getMissions', {
                    force: false,
                    feature: 'ecl-averageCredits',
                })
                .then(() => averageCredits(LSSM));
        });
    }

    const eventMissionsSettings = await getSetting<
        AppendableListSetting<
            {
                text: string;
                missions: string[];
            }[]
        >
    >('eventMissions');

    if (eventMissionsSettings.enabled && eventMissionsSettings.value.length) {
        import(
            /* webpackChunkName: "modules/extendedCallList/eventMissions" */ './assets/eventMissions'
        ).then(({ default: eventMissions }) =>
            eventMissions(LSSM, eventMissionsSettings.value)
        );
    }
}) as ModuleMainFunction;
