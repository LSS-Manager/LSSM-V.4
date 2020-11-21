import SchoolingSummary from '../components/schoolingSummary.vue';
import { SchoolingSummaryObject } from 'typings/modules/ExtendedBuilding/schoolingSummary';
import { InternalVehicle, Vehicle } from 'typings/Vehicle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m): void => {
    const dataList = document.querySelector('dl:last-of-type');

    if (!dataList) return;

    const personnel = Array.from(
        document.querySelectorAll('#personal_table tbody tr') as NodeListOf<
            HTMLTableRowElement
        >
    );

    const summaryAll = {} as SchoolingSummaryObject;
    const summaryEach = {} as SchoolingSummaryObject;

    personnel.forEach(p => {
        const children = p.children as HTMLCollectionOf<HTMLTableCellElement>;
        const schoolings = children[1].textContent?.trim() || '';
        const bound = children[2].textContent?.trim().length || 0;
        if (!summaryAll.hasOwnProperty(schoolings))
            summaryAll[schoolings] = {
                amount: 0,
                bound: 0,
            };
        summaryAll[schoolings].amount++;
        if (bound) summaryAll[schoolings].bound++;
        schoolings.split(',').forEach(schooling => {
            schooling = schooling.trim();
            if (!summaryEach.hasOwnProperty(schooling))
                summaryEach[schooling] = {
                    amount: 0,
                    bound: 0,
                };
            summaryEach[schooling].amount++;
            if (bound) summaryEach[schooling].bound++;
        });
    });

    const dataTitle = document.createElement('dt');
    const titleWrapper = document.createElement('strong');
    titleWrapper.textContent = $m('schoolingSummary.title').toString();
    dataTitle.append(titleWrapper);
    const dataData = document.createElement('dd');
    const overviewWrapper = document.createElement('div');
    dataData.append(overviewWrapper);
    dataList.append(dataTitle, dataData);

    const buildingId = parseInt(
        window.location.pathname.match(/\d+(?=\/personals)/)?.[0] || '-1'
    );
    if (buildingId < 0) return;

    const vehicleTypes = (LSSM.$t('vehicles') as unknown) as {
        [id: number]: InternalVehicle;
    };
    const buildingVehicleTypes = {} as {
        [type: string]: {
            min: number;
            max: number;
        };
    };

    LSSM.$store
        .dispatch('api/fetchVehiclesAtBuilding', buildingId)
        .then((vehicles: Vehicle[]) =>
            vehicles.forEach(v => {
                if (!buildingVehicleTypes.hasOwnProperty(v.vehicle_type))
                    buildingVehicleTypes[v.vehicle_type] = { min: 0, max: 0 };
                buildingVehicleTypes[v.vehicle_type].min +=
                    vehicleTypes[v.vehicle_type].minPersonnel;
                buildingVehicleTypes[v.vehicle_type].max +=
                    vehicleTypes[v.vehicle_type].maxPersonnel;
            })
        );

    new LSSM.$vue({
        store: LSSM.$store,
        i18n: LSSM.$i18n,
        render: h =>
            h(SchoolingSummary, {
                props: {
                    allSchoolings: summaryAll,
                    eachSchoolings: Object.fromEntries(
                        Object.entries(summaryEach).map(
                            ([schooling, { amount, bound }]) => {
                                const matchingTypes = schooling
                                    ? // TODO: Check if this makes problems where there are holes in vehicle IDs
                                      Object.entries(vehicleTypes).filter(
                                          ([, t]) =>
                                              t.shownSchooling === schooling
                                      )
                                    : [];
                                let min = 0;
                                let max = 0;
                                matchingTypes.forEach(([type]) => {
                                    min += buildingVehicleTypes[type]?.min || 0;
                                    max += buildingVehicleTypes[type]?.max || 0;
                                });
                                return [schooling, { amount, bound, min, max }];
                            }
                        )
                    ),
                },
            }),
    }).$mount(overviewWrapper);
};
