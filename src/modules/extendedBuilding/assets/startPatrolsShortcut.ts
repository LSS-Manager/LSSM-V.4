import type { $m, $mc } from 'typings/Module';

export default (LSSM: Vue, $m: $m, $mc: $mc, MODULE_ID: string) => {
    const btnGroup = document.createElement('a');
    btnGroup.classList.add('btn-group');

    const patrolBtn = document.createElement('a');
    patrolBtn.classList.add('btn', 'btn-default', 'btn-xs', 'dropdown-toggle');
    patrolBtn.dataset.toggle = 'dropdown';
    patrolBtn.textContent = $m('startPatrols.title').toString();

    const caret = document.createElement('span');
    caret.classList.add('caret');
    patrolBtn.append(caret);

    const patrolDropdown = document.createElement('ul');
    patrolDropdown.classList.add('dropdown-menu', 'pull-right');

    [3600, 10_800, 21_600].forEach(duration => {
        const liItem = document.createElement('li');
        liItem.dataset.duration = duration.toString();
        const aItem = document.createElement('a');
        aItem.textContent = $mc(
            'startPatrols.duration',
            duration / 60 / 60
        ).toString();
        aItem.href = '#';

        liItem.append(aItem);
        patrolDropdown.append(liItem);

        liItem.addEventListener('click', e => {
            e.preventDefault();
            LSSM.$stores.api
                .request({
                    url: `/vehiclepatrols/start/${duration}?duration=${duration}`,
                    feature: `${MODULE_ID}_startPatrolsShortcut`,
                })
                .then(res => res.text())
                .then(html => {
                    const doc = new DOMParser().parseFromString(
                        html,
                        'text/html'
                    );
                    const alertContent = doc
                        .querySelector('.alert.fade.in.alert-success')
                        ?.textContent?.trim()
                        .substring(1);
                    if (alertContent) window.successfullMessage(alertContent);
                });
        });
    });

    btnGroup.append(patrolBtn, patrolDropdown);

    document
        .querySelector<HTMLDivElement>('#building-list-header-buttons')
        ?.append(btnGroup);
};
