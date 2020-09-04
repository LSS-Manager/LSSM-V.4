import { ModuleMainFunction } from 'typings/Module';

export default (async (LSSM, MODULE_ID) => {
    await LSSM.$store.dispatch('settings/register', {
        moduleId: MODULE_ID,
        settings: {
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
        },
    });
}) as ModuleMainFunction;
