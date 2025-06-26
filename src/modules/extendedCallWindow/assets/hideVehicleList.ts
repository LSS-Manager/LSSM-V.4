import type { $m } from 'typings/Module';

export default (LSSM: Vue, MODULE_ID: string, $m: $m): void => {
    const toggleBtnId = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-toggle-vehiclelist`,
        true
    );
    const btn = document.createElement('button');
    btn.setAttribute('id', toggleBtnId);
    btn.classList.add('btn', 'btn-success');
    const toggleHidden = () => {
        const free_vehicles = document.getElementById('h2_free_vehicles');
        free_vehicles?.classList.toggle('hidden');
        const vehicle_list_step = document.getElementById('vehicle_list_step');
        vehicle_list_step?.classList.toggle('hidden');
        const group_max_distance =
            document.getElementById('group_max_distance');
        group_max_distance?.classList.toggle('hidden');
        btn.textContent = $m(
            `hideVehicleList.${
                vehicle_list_step?.classList.contains('hidden')
                    ? 'show'
                    : 'hide'
            }`
        ) as string;
    };
    btn.addEventListener('click', e => {
        e.preventDefault();
        toggleHidden();
    });
    document
        .querySelector('#dispatch_buttons')
        ?.insertAdjacentElement('afterbegin', btn);
    toggleHidden();
};
