export default (
    LSSM: Vue,
    MODULE_ID: string,
    icons: {
        icon: string;
        type: 'fab' | 'far' | 'fas';
        vehicleTypes: (number | string)[];
    }[]
): void => {
    const alarmBtn =
        document.querySelector<HTMLAnchorElement>('#mission_alarm_btn');
    const vehicleList = document.querySelector<HTMLTableElement>(
        '#vehicle_show_table_all'
    );
    if (!alarmBtn || !vehicleList) return;

    const spacing = document.createElement('span');
    spacing.innerHTML = '&nbsp;';
    spacing.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-alarm_icons-spacing`
    );
    spacing.style.setProperty('display', 'none');

    LSSM.$stores.root.addStyle({
        selectorText: `.svg-inline--fa:not(.hidden) ~ #${spacing.id}`,
        style: {
            display: 'inline !important',
        },
    });

    alarmBtn.prepend(spacing);

    icons.reverse().forEach(({ icon, type }) => {
        const iconEl = document.createElement('i');
        iconEl.classList.add(type, `fa-${icon}`, 'hidden');
        alarmBtn.prepend(iconEl);
    });

    const calcIcons = () => {
        const vehicles = vehicleList.querySelectorAll(
            '.vehicle_checkbox:checked'
        );
        Array.from(alarmBtn.querySelectorAll('.svg-inline--fa')).forEach(icon =>
            icon.classList.add('hidden')
        );
        vehicles.forEach(v => {
            const type = v.getAttribute('vehicle_type_id');
            const type_name = `${type}-${v.parentElement?.parentElement?.getAttribute(
                'vehicle_type'
            )}`;
            const isCustomVehicleType = !v.hasAttribute('custom_');
            const checks: string[] = [];
            if (type) checks.push(type);
            if (type_name) checks.push(type_name);
            if (!isCustomVehicleType) checks.push(`${type}*`);
            checks
                .filter(t => !!t)
                .forEach(vType =>
                    icons
                        .filter(icon =>
                            icon.vehicleTypes
                                .map(t => t.toString())
                                .includes(vType)
                        )
                        .forEach(
                            ({ icon }) =>
                                alarmBtn
                                    .querySelector(`.svg-inline--fa.fa-${icon}`)
                                    ?.classList.remove('hidden')
                        )
                );
        });
    };

    vehicleList.addEventListener('change', calcIcons);

    calcIcons();

    LSSM.$stores.root.hook({
        event: 'aaoClickHandler',
        callback: calcIcons,
    });
    LSSM.$stores.root.hook({
        event: 'vehicleGroupClickHandler',
        callback: calcIcons,
    });
};
