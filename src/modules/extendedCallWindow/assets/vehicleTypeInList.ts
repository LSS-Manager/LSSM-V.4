export default (): void =>
    document
        .querySelectorAll<HTMLTableRowElement>(
            '#vehicle_list_step table#vehicle_show_table_all tbody tr'
        )
        .forEach(row => {
            const type = row.getAttribute('vehicle_type');
            row.querySelector<HTMLLabelElement>(
                'td[vehicle_type_id] label.mission_vehicle_label'
            )?.before(
                (() => {
                    const holder = document.createElement('small');
                    holder.classList.add('pull-right');
                    holder.textContent = `[${type}]`;
                    return holder;
                })()
            );
        });
