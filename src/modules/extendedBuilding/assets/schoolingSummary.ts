import SchoolingSummary from '../components/schoolingSummary.vue';
import {
    EachSchooling,
    SchoolingSummaryObject,
} from 'typings/modules/ExtendedBuilding/schoolingSummary';
import { InternalVehicle, Vehicle } from 'typings/Vehicle';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default (LSSM: Vue, $m: $m): void => {
    const dataList = document.querySelector<HTMLDataListElement>(
        'dl:last-of-type'
    );

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
                    min: 0,
                    max: 0,
                };
            summaryEach[schooling].amount++;
            if (bound) summaryEach[schooling].bound++;
        });
    });

    const buildingId = parseInt(
        window.location.pathname.match(/\d+(?=\/personals)/)?.[0] || '-1'
    );
    if (buildingId < 0) return;

    const vehicleTypes = (LSSM.$t('vehicles') as unknown) as {
        [id: number]: InternalVehicle;
    };

    LSSM.$store
        .dispatch('api/fetchVehiclesAtBuilding', buildingId)
        .then((vehicles: Vehicle[]) => {
            vehicles.forEach(v => {
                const type = vehicleTypes[v.vehicle_type];
                const schooling = type.shownSchooling;
                if (!schooling || !summaryEach.hasOwnProperty(schooling))
                    return;
                summaryEach[schooling].min += type.minPersonnel;
                summaryEach[schooling].max +=
                    v.max_personnel_override ?? type.maxPersonnel;
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
