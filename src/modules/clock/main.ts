import { bounds } from 'leaflet';
import { ModuleMainFunction } from 'typings/Module';
import moment from 'moment';

export default (async (LSSM, MODULE_ID) => {
    const getSetting = (settingId: string) =>
        LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId,
        });
    const className = LSSM.$store.getters.nodeAttribute('clock');

    moment.locale(LSSM.$store.state.lang);

    const createClock = async (location: string) => {
        const clock = document.createElement('a');
        clock.classList.add(className);
        clock.setAttribute('format', await getSetting(`${location}Format`));
        return clock;
    };

    if (await getSetting('displayNav')) {
        const clock = await createClock('nav');
        clock.classList.add('navbar-brand');
        document.querySelector('.navbar-header')?.appendChild(clock);
    }

    if (await getSetting('displayOverlay')) {
        const clock = await createClock('overlay');
        clock.classList.add('lssm_overlay');
        clock.setAttribute('draggable', 'true');
        clock.style.background = 'black';
        clock.style.color = 'white';

        const { x, y } = await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'overlayPosition',
            defaultValue: { x: '0px', y: '0px' },
        });
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
            await LSSM.$store.dispatch('settings/setSetting', {
                moduleId: MODULE_ID,
                settingId: 'overlayPosition',
                value: {
                    x: clock.style.left,
                    y: clock.style.top,
                },
            });
        });
        document.body.appendChild(clock);
    }

    const clocks = document.querySelectorAll(`.${className}`);
    setInterval(() => {
        clocks.forEach(clock => {
            clock.textContent = moment().format(
                clock.getAttribute('format')?.toString()
            );
        });
    }, 1000);
}) as ModuleMainFunction;
