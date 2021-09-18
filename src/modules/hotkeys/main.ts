import { ModuleMainFunction } from 'typings/Module';

import HotkeyUtility from './assets/HotkeyUtility';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = (settingId: string) => {
        return LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    };

    const input = document.createElement('input');
    const trigger = document.createElement('button');
    trigger.textContent = 'click';
    document.body.append(input, trigger);

    const h = new HotkeyUtility();
    trigger.onclick = () =>
        h.record(
            document.body,
            sequence => (input.value = JSON.stringify(sequence))
        );
    const shiftA = HotkeyUtility.createListener(['shift+a'], () =>
        console.log('shift+a')
    );
    const shiftB = HotkeyUtility.createListener(['shift+b'], () =>
        console.log('shift+b')
    );
    const stopListen = h.listen([
        shiftA,
        [
            ['shift+a', 'shift+b'],
            () => {
                console.log('shift+a, shift+b');
                stopListen([shiftA, shiftB]);
            },
        ],
        shiftB,
    ]);

    const example = await getSetting('exampleHotkey');
    if (example) {
        h.addListener(
            HotkeyUtility.createListener(example.split(' '), () => {
                alert("you've triggered example hotkey");
            })
        );
    }
}) as ModuleMainFunction;
