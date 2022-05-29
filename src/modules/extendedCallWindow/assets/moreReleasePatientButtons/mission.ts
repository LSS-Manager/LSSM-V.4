export default (releaseText: string) => {
    document
        .querySelectorAll<HTMLAnchorElement>(
            '.alert.alert-danger a.btn.btn-success[href^="/vehicles/"]'
        )
        .forEach(vehicle => {
            const btnGroup = document.createElement('span');
            btnGroup.classList.add('btn-group');
            vehicle.before(btnGroup);

            const releaseBtn = document.createElement('a');
            releaseBtn.classList.add('btn', 'btn-default', 'btn-xs');
            releaseBtn.href = `${vehicle.href}/patient/-1`;
            releaseBtn.textContent = releaseText;

            btnGroup.append(vehicle, releaseBtn);
        });

    document
        .querySelectorAll<HTMLAnchorElement>(
            '#mission_vehicle_at_mission tbody tr a.btn.btn-success[href^="/vehicles/"]'
        )
        .forEach(vehicle => {
            const releaseBtn = document.createElement('a');
            releaseBtn.classList.add('btn', 'btn-default', 'btn-xs');
            releaseBtn.href = `${vehicle.href}/patient/-1`;
            releaseBtn.textContent = releaseText;

            vehicle.after(releaseBtn);
        });
};
