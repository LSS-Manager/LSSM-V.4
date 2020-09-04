export default (): unknown => ({
    displayNav: {
        type: 'toggle',
        default: true,
    },
    navFormat: {
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayNav',
    },
    displayOverlay: {
        type: 'toggle',
        default: false,
    },
    overlayFormat: {
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayOverlay',
    },
});
