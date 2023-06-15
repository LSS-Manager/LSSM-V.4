import moment from 'moment';

import type { $m } from 'typings/Module';

export default (LSSM: Vue, MODULE_ID: string, $m: $m): void => {
    const expansionRows = document.querySelectorAll<HTMLTableRowElement>(
        '#ausbauten tbody tr'
    );
    const dlWrapper = document.createElement('div');
    dlWrapper.classList.add('row');
    const existingDl = document.querySelector(
        'dl.dl-horizontal'
    ) as HTMLDListElement | null;
    if (!existingDl) return;
    existingDl.classList.add('col-md-4');
    existingDl.before(dlWrapper);
    dlWrapper.append(existingDl);
    const expansionWrapper = document.createElement('table');
    expansionWrapper.id = LSSM.$stores.root.nodeAttribute(
        `${MODULE_ID}-expansions-table`,
        true
    );
    const style = document.createElement('style');
    style.textContent = `
#${expansionWrapper.id} tr td:last-of-type {
    display: grid;
    grid-gap: 1px;
    grid-template-columns: repeat(auto-fit, minmax(25rem, calc(calc(100% / 3.5) - 16px)));
    list-style: none;
    padding-left: 0;
}
@media (max-width: 1950px) {
    #lssmv4-extendedBuilding-expansions-table tr td:last-of-type {
        grid-template-columns: repeat(auto-fit, minmax(25rem, calc(calc(100% / 3) - 16px)));
    }
}
@media (max-width: 1480px) {
    #lssmv4-extendedBuilding-expansions-table tr td:last-of-type {
        grid-template-columns: repeat(auto-fit, minmax(25rem, calc(calc(100% / 2) - 16px)));
    }
}
@media (max-width: 710px) {
    #lssmv4-extendedBuilding-expansions-table tr td:last-of-type {
        grid-template-columns: repeat(auto-fit, minmax(25rem, calc(calc(100% / 1) - 16px)));
    }
}`;
    document.head.append(style);
    expansionWrapper.classList.add('col-md-4');
    dlWrapper.append(expansionWrapper);
    const expansionIndex = {} as Record<string, HTMLSpanElement[]>;
    const expansionIndexByEndTime = {} as Record<
        string,
        [HTMLSpanElement, string]
    >;
    moment.locale(LSSM.$stores.root.locale);
    expansionRows.forEach(expansion => {
        const name =
            expansion.firstElementChild?.querySelector('b')?.textContent;
        const endTime = expansion.querySelector<HTMLSpanElement>(
            'span[data-end-time]'
        )?.dataset.endTime;
        if (!name) return;
        if (!expansionIndex.hasOwnProperty(name)) expansionIndex[name] = [];
        const label = document.createElement('span');
        label.classList.add('label');
        label.style.marginLeft = '0.5em';
        label.style.marginRight = '0.5em';
        const successLabel = expansion.querySelector('.label-success');
        if (endTime) {
            label.classList.add(
                `label-${
                    expansion.querySelector('a[href*="extension_finish"]')
                        ? 'warning'
                        : 'info'
                }`
            );
        } else if (
            expansion.querySelector('a[href*="extension_ready"]') ||
            successLabel
        ) {
            label.classList.add(
                expansion.querySelector('.label-danger')
                    ? 'label-danger'
                    : 'label-success'
            );
            label.textContent =
                successLabel?.textContent ??
                expansion.querySelector('.label-danger')?.textContent ??
                '';
        } else {
            label.classList.add('label-primary');
            label.textContent = $m('expansions.notBuild').toString();
        }
        expansionIndex[name].push(label);
        if (endTime) {
            expansionIndexByEndTime[endTime] = [
                label,
                moment(new Date(parseInt(endTime))).calendar(),
            ];
        }
    });
    Object.entries(expansionIndex).forEach(([expansion, labels]) => {
        const row = expansionWrapper.insertRow();
        row.style.backgroundColor = 'unset';
        const name = row.insertCell();
        name.textContent = expansion;
        name.style.fontWeight = 'bold';
        name.style.textAlign = 'right';
        name.style.paddingRight = '1em';
        row.insertCell().append(...labels);
    });
    LSSM.$stores.root.hook({
        event: 'updateTimer',
        callback(
            ...[{ $timer, endTime }]: Parameters<typeof window.updateTimer>
        ) {
            const [label, calendarString] =
                expansionIndexByEndTime[$timer.data('end-time')];
            label.textContent = `${window.formatTime(
                Math.round((endTime.getTime() - Date.now()) / 1000)
            )} (${calendarString})`;
        },
    });
};
