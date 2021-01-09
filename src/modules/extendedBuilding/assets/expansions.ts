import moment from 'moment';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { $m } from 'typings/Module';

export default (LSSM: Vue, MODULE_ID: string, $m: $m): void => {
    const expansionRows = document.querySelectorAll(
        '#ausbauten tbody tr'
    ) as NodeListOf<HTMLTableRowElement>;
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
    expansionWrapper.id = LSSM.$store.getters.nodeAttribute(
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
    const expansionIndex = {} as { [name: string]: HTMLSpanElement[] };
    expansionRows.forEach(expansion => {
        const name = expansion.firstElementChild?.querySelector('b')
            ?.textContent;
        if (!name) return;
        if (!expansionIndex.hasOwnProperty(name)) expansionIndex[name] = [];
        const label = document.createElement('span');
        label.classList.add('label');
        label.style.marginLeft = '0.5em';
        label.style.marginRight = '0.5em';
        const countdown = expansion.querySelector(
            'span[id^="extension_countdown_"]'
        );
        const successLabel = expansion.querySelector('.label-success');
        if (countdown) {
            countdown.classList.add(countdown.id);
            label.classList.add(countdown.id);
            label.appendChild(countdown.cloneNode(true));
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
            label.classList.add('.label-danger');
            label.textContent =
                successLabel?.textContent ??
                expansion.querySelector('.label-danger')?.textContent ??
                '';
        } else {
            label.classList.add('label-danger');
            label.textContent = $m('expansions.notBuild').toString();
        }
        expansionIndex[name].push(label);
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
    moment.locale(LSSM.$store.state.lang);
    window.extensionCountdown = (remaining, id) => {
        if (remaining > 0) {
            document.querySelectorAll(`.extension_countdown_${id}`).forEach(
                countdown =>
                    (countdown.textContent = `${window.formatTime(
                        remaining
                    )} (${moment()
                        .add(remaining, 'seconds')
                        .calendar()})`)
            );
            setTimeout(function() {
                window.extensionCountdown(remaining - 1, id);
            }, 1000);
        }
    };
};


