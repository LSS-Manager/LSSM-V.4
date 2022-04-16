import SchoolingSummary from '../components/schoolingSummary.vue';

import type { $m } from 'typings/Module';
import type { Schooling } from 'typings/Schooling';
import type { Building, InternalBuilding } from 'typings/Building';
import type {
    EachSchooling,
    SchoolingSummaryObject,
} from 'typings/modules/ExtendedBuilding/schoolingSummary';
import type { InternalVehicle, Vehicle } from 'typings/Vehicle';

export default async (LSSM: Vue, $m: $m, MODULE_ID: string): Promise<void> => {
    await LSSM.$store.dispatch('api/registerBuildingsUsage', {
        feature: `${MODULE_ID}-schoolingSummary`,
    });
    const dataList =
        document.querySelector<HTMLDataListElement>('dl:last-of-type');

    if (!dataList) return;

    const personnel = Array.from(
        document.querySelectorAll<HTMLTableRowElement>(
            '#personal_table tbody tr'
        )
    );

    const dataTitle = document.createElement('dt');
    const titleWrapper = document.createElement('strong');
    titleWrapper.textContent = $m('schoolingSummary.title').toString();
    dataTitle.append(titleWrapper);
    const dataData = document.createElement('dd');
    const overviewWrapper = document.createElement('div');
    dataData.append(overviewWrapper);
    dataList.append(dataTitle, dataData);

    const summaryAll = {} as SchoolingSummaryObject;
    const summaryEach = {} as SchoolingSummaryObject<EachSchooling>;

    personnel.forEach(p => {
        const children = p.children as HTMLCollectionOf<HTMLTableCellElement>;
        const schoolings =
            children[1].textContent?.trim() ||
            $m('schoolingSummary.noSchooling').toString();
        const bound = children[2].textContent?.trim().length || 0;
        if (!summaryAll.hasOwnProperty(schoolings)) {
            summaryAll[schoolings] = {
                amount: 0,
                bound: 0,
            };
        }
        summaryAll[schoolings].amount++;
        if (bound) summaryAll[schoolings].bound++;
        schoolings.split(',').forEach(schooling => {
            const schoolingName = schooling.trim();
            if (!summaryEach.hasOwnProperty(schoolingName)) {
                summaryEach[schoolingName] = {
                    amount: 0,
                    bound: 0,
                    min: 0,
                    max: 0,
                };
            }
            summaryEach[schoolingName].amount++;
            if (bound) summaryEach[schoolingName].bound++;
        });
    });

    const buildingId = parseInt(
        window.location.pathname.match(/\d+(?=\/personals)/u)?.[0] || '-1'
    );
    if (buildingId < 0) return;

    const vehicleTypes = LSSM.$t('vehicles') as unknown as Record<
        number,
        InternalVehicle
    >;

    const schools = (LSSM.$t('buildings') as Record<number, InternalBuilding>)[
        (LSSM.$store.state.api.buildings as Building[]).find(
            ({ id }) => id === buildingId
        )?.building_type ?? -1
    ]?.schoolingTypes;

    if (!schools) return;

    const schoolingStaffListByCaption = Object.fromEntries(
        schools.map(school => [
            school,
            Object.fromEntries(
                (
                    LSSM.$t('schoolings') as unknown as Record<
                        string,
                        Schooling[]
                    >
                )[school].map(({ caption, staffList }) => [caption, staffList])
            ),
        ])
    );

    LSSM.$store
        .dispatch('api/fetchVehiclesAtBuilding', {
            id: buildingId,
            feature: `${MODULE_ID}-schoolingSummary`,
        })
        .then((vehicles: Vehicle[]) => {
            vehicles.forEach(v => {
                const type = vehicleTypes[v.vehicle_type];
                schools.forEach(school => {
                    const vehicleSchoolings = type.schooling?.[school] ?? {};
                    Object.entries(vehicleSchoolings).forEach(
                        ([schooling, { min, all }]) => {
                            const staffListSchooling =
                                schoolingStaffListByCaption[school][schooling];
                            if (
                                !staffListSchooling ||
                                !summaryEach.hasOwnProperty(staffListSchooling)
                            )
                                return;
                            summaryEach[staffListSchooling].min +=
                                (all ? null : min) ?? type.minPersonnel;
                            summaryEach[staffListSchooling].max +=
                                v.max_personnel_override ?? type.maxPersonnel;
                        }
                    );
                });
            });

            new LSSM.$vue({
                store: LSSM.$store,
                i18n: LSSM.$i18n,
                render: h =>
                    h(SchoolingSummary, {
                        props: {
                            allSchoolings: summaryAll,
                            eachSchoolings: summaryEach,
                        },
                    }),
            }).$mount(overviewWrapper);
        });
};
