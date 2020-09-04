export default (): unknown => ({
    prevNextElement: {
        type: 'toggle',
        default: false,
    },
    prevElementKey: {
        type: 'hotkey',
        default: 'left',
        dependsOn: '.prevNextElement',
    },
    nextElementKey: {
        type: 'hotkey',
        default: 'right',
        dependsOn: '.prevNextElement',
    },
});
