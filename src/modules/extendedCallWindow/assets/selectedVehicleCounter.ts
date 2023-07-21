export default (LSSM: Vue, MODULE_ID: string, btnVehicles: string[]): void => {
    const vehicleList = document.querySelector<HTMLTableElement>(
        '#vehicle_show_table_all'
    );

    if (!vehicleList) return;

    const vehicleIcon = document.createElement('i');
    vehicleIcon.classList.add('fa-solid', 'fa-car');

    const btn = document.createElement('button');
    btn.classList.add(
        'btn',
        'btn-sm',
        'btn-success',
        'navbar-btn',
        'dropdown-toggle'
    );
    btn.dataset.toggle = 'dropdown';
    btn.append(vehicleIcon);

    const vehicleSpan = document.createElement('span');
    if (btnVehicles.length) btn.append('\xa0', vehicleSpan); // \xao is &nbsp;

    const caret = document.createElement('span');
    caret.classList.add('caret');
    btn.append('\xa0', caret);

    const tableBody = document.createElement('tbody');
    tableBody.style.setProperty('display', 'inline-table');
    tableBody.style.setProperty('width', '100%');
    tableBody.style.setProperty('font-size', '12px');

    const table = document.createElement('table');
    table.id = LSSM.$stores.root.nodeAttribute(`${MODULE_ID}_svc_table`, true);
    table.classList.add(
        'dropdown-menu',
        'table',
        'table-striped',
        'table-hover',
        'table-condensed'
    );
    table.style.setProperty('padding', '0');
    table.style.setProperty('border', '1px solid transparent');
    table.style.setProperty('border-radius', '4px');
    table.style.setProperty('overflow', 'auto');
    table.style.setProperty('width', 'auto');
    if (!LSSM.$stores.root.isDarkMode) table.style.setProperty('color', '#333');
    table.append(tableBody);

    table.addEventListener('click', e => {
        e.preventDefault();
        e.stopImmediatePropagation();
    });

    const btnGroup = document.createElement('div');
    btnGroup.classList.add('btn-group', 'dropup');
    btnGroup.append(btn, table);

    $(btnGroup).on('shown.bs.dropdown', () => {
        table.style.setProperty(
            'max-height',
            `calc(100vh - ${Math.ceil(
                window.innerHeight - table.getBoundingClientRect().bottom
            )}px)`
        );
    });

    document.querySelector('.navbar-header')?.after(btnGroup);

    LSSM.$stores.root.addStyle({
        selectorText: `#${table.id} tr:nth-child(1) td`,
        style: {
            'border-top': 'none',
        },
    });

    const calcBtn = () => {
        const vehicleTypes: Record<string, number> = {};

        const vehicles = vehicleList.querySelectorAll(
            '.vehicle_checkbox:checked'
        );
        vehicles.forEach(v => {
            const type = v.getAttribute('vehicle_type_id');
            if (!type) return;
            if (!vehicleTypes[type]) vehicleTypes[type] = 0;
            vehicleTypes[type]++;
        });

        tableBody.innerHTML = '';
        Object.entries(vehicleTypes)
            .map<[string, number]>(([type, count]) => [
                LSSM.$stores.translations.vehicles[parseInt(type)].caption,
                count,
            ])
            .sort(([a], [b]) => a.localeCompare(b))
            .forEach(([caption, count]) => {
                const row = tableBody.insertRow();
                const nameCell = row.insertCell();
                const countCell = row.insertCell();
                nameCell.textContent = caption;
                countCell.textContent = count.toLocaleString();
                countCell.style.setProperty('text-align', 'right');
            });

        if (btnVehicles.length) {
            vehicleSpan.textContent = btnVehicles
                .map(
                    vehicle =>
                        `${
                            LSSM.$stores.translations.vehicles[
                                parseInt(vehicle)
                            ].caption
                        }: ${vehicleTypes[vehicle]?.toLocaleString() ?? 0}`
                )
                .join('\xa0');
        }
    };

    vehicleList.addEventListener('change', calcBtn);

    calcBtn();

    LSSM.$stores.root.hook({
        event: 'aaoClickHandler',
        callback: calcBtn,
    });
    LSSM.$stores.root.hook({
        event: 'vehicleGroupClickHandler',
        callback: calcBtn,
    });
};
