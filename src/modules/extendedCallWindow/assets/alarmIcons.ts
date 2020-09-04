export default (
    LSSM: Vue,
    icons: {
        icon: string;
        type: 'fas' | 'far' | 'fab';
        vehicleTypes: (number | string)[];
    }[]
): void => {
    LSSM.$store.commit('useFontAwesome');

    const alarmBtn = document.getElementById('mission_alarm_btn');
    const vehicleList = document.getElementById('vehicle_show_table_all');
    if (!alarmBtn || !vehicleList) return;

    alarmBtn.insertAdjacentHTML('afterbegin', '&nbsp;');

    icons.reverse().forEach(({ icon, type }) => {
        const iconEl = document.createElement('i');
        iconEl.classList.add(type, `fa-${icon}`, 'hidden');
        alarmBtn.prepend(iconEl);
    });

    vehicleList.addEventListener('change', () => {
        const vehicles = vehicleList.querySelectorAll(
            '.vehicle_checkbox:checked'
        );
        Array.from(alarmBtn.querySelectorAll('.svg-inline--fa')).forEach(icon =>
            icon.classList.add('hidden')
        );
        vehicles.forEach(v => {
            const type = v.getAttribute('vehicle_type_id');
            const type_name = v.parentElement?.parentElement?.getAttribute(
                'vehicle_type'
            );
            ([type, type_name].filter(t => !!t) as string[]).forEach(vType =>
                icons
                    .filter(icon =>
                        icon.vehicleTypes.map(t => t.toString()).includes(vType)
                    )
                    .forEach(({ icon }) =>
                        alarmBtn
                            .querySelector(`.svg-inline--fa.fa-${icon}`)
                            ?.classList.remove('hidden')
                    )
            );
        });
    });
};
