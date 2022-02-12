import type { ProgressbarTimer } from 'typings/Ingame';

export default (LSSM: Vue): Promise<void> =>
    LSSM.$store
        .dispatch('hook', {
            event: 'startProgressBar',
            callback({ $element, endTime }: ProgressbarTimer) {
                const bar = $element[0];
                const barOuter = bar.parentElement;
                if (!bar || !barOuter) return;
                let outer =
                    barOuter.parentElement?.querySelector<HTMLDivElement>(
                        '.mission_overview_countdown'
                    );
                if (!outer) {
                    outer = document.createElement('div');
                    outer.classList.add('mission_overview_countdown');
                    outer.style.setProperty('display', 'inline-block');
                    barOuter.before(outer);
                }
                outer.textContent = window.formatTime(
                    Math.floor(endTime / 1000 - window.unix_timestamp()),
                    false
                );
            },
        })
        .then();
