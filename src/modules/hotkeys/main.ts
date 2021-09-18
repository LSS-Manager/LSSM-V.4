import { ModuleMainFunction } from 'typings/Module';

import HotkeyUtility from './assets/HotkeyUtility';

export default (async () => {
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
}) as ModuleMainFunction;
