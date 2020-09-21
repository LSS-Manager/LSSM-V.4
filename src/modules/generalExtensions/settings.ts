export default (): unknown => ({
    clickableLinks: {
        type: 'toggle',
        default: true,
    },
    showImg: {
        type: 'toggle',
        default: true,
        dependsOn: '.clickableLinks',
    },
    linkPreviews: {
        type: 'multiSelect',
        default: [],
        values: ['buildings', 'missions', 'vehicles', 'profile'],
    },
    mapUndo: {
        type: 'toggle',
        default: false,
        noMapkit: true,
    },
    browserTitle: {
        type: 'toggle',
        default: true,
    },
    emojiPicker: {
        type: 'toggle',
        default: false,
    },
});
