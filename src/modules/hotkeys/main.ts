import { ModuleMainFunction } from 'typings/Module';

import Hotkey from './assets/Hotkey';

export default (async () => {
    const input = document.createElement('input');
    const trigger = document.createElement('button');
    trigger.textContent = 'click';
    document.body.append(input, trigger);

    const h = new Hotkey();
    trigger.onclick = () =>
        h.record(
            document.body,
            sequence => (input.value = JSON.stringify(sequence))
        );
    const shiftA = Hotkey.createListener(['shift+a'], () =>
        console.log('shift+a')
    );
    const shiftB = Hotkey.createListener(['shift+b'], () =>
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
