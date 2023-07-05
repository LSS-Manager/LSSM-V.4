import moment from 'moment-timezone';

import type { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async ({
    LSSM,
    getSetting,
    setSetting,
}) => {
    const className = LSSM.$stores.root.nodeAttribute('clock');

    moment.locale(LSSM.$stores.root.locale);

    const createClock = async (location: string) => {
        const clock = document.createElement('a');
        clock.classList.add(className);
        clock.setAttribute('format', await getSetting(`${location}Format`));
        return clock;
    };

    if (await getSetting('displayNav')) {
        const clock = await createClock('nav');
        clock.classList.add('navbar-brand');
        document.querySelector('.navbar-header')?.append(clock);
    }

    if (await getSetting('displayOverlay')) {
        const clock = await createClock('overlay');
        clock.classList.add('lssm_overlay');
        clock.setAttribute('draggable', 'true');
        clock.style.background = 'black';
        clock.style.color = 'white';

        const { x, y } = await getSetting<{ x: string; y: string }>(
            'overlayPosition',
            { x: '0px', y: '0px' }
        );
        clock.style.top = y;
        clock.style.left = x;

        clock.addEventListener('dragstart', drag => {
            if (!drag.dataTransfer) return;
            drag.dataTransfer.dropEffect = 'move';
            drag.dataTransfer.effectAllowed = 'move';
            drag.dataTransfer.setDragImage(clock, 0, 0);
        });
        /*clock.addEventListener('drag', drag => {
            //const bounds = clock.getBoundingClientRect();
            clock.style.top = `${drag.screenY}px`;
            clock.style.left = `${drag.screenX}px`;
        });*/
        clock.addEventListener('dragend', async drag => {
            const bounds = clock.getBoundingClientRect();
            clock.style.top = `${drag.screenY - bounds.height * 2.6}px`;
            clock.style.left = `${drag.screenX}px`;
            await setSetting('overlayPosition', {
                x: clock.style.left,
                y: clock.style.top,
            });
        });
        document.body.append(clock);
    }

    const clocks = document.querySelectorAll(`.${className}`);

    const timezone = await getSetting<string>('timeZone');

    setInterval(() => {
        clocks.forEach(clock => {
            clock.textContent = timezone
                ? moment()
                      .tz(timezone)
                      .format(clock.getAttribute('format')?.toString())
                : moment().format(clock.getAttribute('format')?.toString());
        });
    }, 1000);
});
