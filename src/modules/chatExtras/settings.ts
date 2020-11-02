export default (MODULE_ID: string, LSSM: Vue): unknown => ({
    DayMonthSort: {
        type: 'toggle',
        values: ['Day Month', 'Month Day'],
        default: 'Day Month',
    },
    Seperator: {
        type: 'select',
        values: ['.', '-', '/'],
        default: '.',
    },
});
