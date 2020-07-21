import SchoolingSummary from '../components/schoolingSummary.vue';
import { SchoolingSummaryObject } from 'typings/modules/ExtendedBuilding/schoolingSummary';

export default (LSSM: Vue): void => {
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
    titleWrapper.textContent = LSSM.$t(
        `modules.${MODULE_ID}.schoolingSummary.title`
    ).toString();
    dataTitle.append(titleWrapper);
    const dataData = document.createElement('dd');
    const overviewWrapper = document.createElement('div');
    dataData.append(overviewWrapper);
    dataList.append(dataTitle, dataData);

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
};
