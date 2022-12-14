import type { $m } from 'typings/Module';

export default (LSSM: Vue, MODULE_ID: string, $m: $m) => {
    const renewAllButton = document.createElement('button');
    renewAllButton.classList.add('btn', 'btn-default', 'btn-xs');
    renewAllButton.style.setProperty('margin-left', '1rem');
    renewAllButton.style.setProperty('margin-right', '1rem');
    renewAllButton.textContent = $m('title').toString();

    const renewalCounter = document.createElement('span');

    renewAllButton.addEventListener('click', e => {
        e.preventDefault();
        renewAllButton.disabled = true;
        renewAllButton.classList.add('disabled');
        LSSM.$stores.api
            .getBuildings(`${MODULE_ID}_renewStagingAreasShortcut`)
            .then(buildings =>
                buildings.value.filter(({ building_type }) =>
                    LSSM.$stores.translations.stagingAreaBuildings.includes(
                        building_type
                    )
                )
            )
            .then(async stagingAreas => {
                renewalCounter.textContent = `0 / ${stagingAreas.length}`;
                let counter = 0;
                for (const { id } of stagingAreas) {
                    await LSSM.$stores.api.request({
                        url: `/buildings/${id}/bereitstellung-verlaengern`,
                        feature: `${MODULE_ID}_renewStagingAreasShortcut`,
                    });
                    counter++;
                    renewalCounter.textContent = `${counter} / ${stagingAreas.length}`;
                }
            })
            .then(() => window.location.reload());
    });

    const countdown = document.querySelector<HTMLElement>(
        '#education_schooling_-1'
    );

    if (!countdown) return;

    const wrapper = document.createElement('dd');
    countdown.before(wrapper);
    const newCountdown = document.createElement('span');
    newCountdown.id = countdown.id;
    wrapper.append(newCountdown, renewAllButton, renewalCounter);
    countdown.remove();
};
