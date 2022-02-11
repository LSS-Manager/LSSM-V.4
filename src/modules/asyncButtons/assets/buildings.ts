import type { $m } from 'typings/Module';

export default (
    LSSM: Vue,
    buildingSettings: string[],
    $m: $m,
    MODULE_ID: string
): void => {
    const BUILDING_MODE = document.querySelector<HTMLDivElement>('#ausbauten')
        ? 'building'
        : 'dispatch';

    if (BUILDING_MODE === 'dispatch') return;

    // Alliance Tax
    if (buildingSettings.includes('buildingTax')) {
        const taxBtns = Array.from(
            document.querySelectorAll('.btn-alliance_costs')
        );
        taxBtns.forEach(btn => {
            btn.addEventListener('click', async e => {
                e.preventDefault();
                taxBtns.forEach(tbtn => tbtn.classList.add('disabled'));
                await LSSM.$store
                    .dispatch('api/request', {
                        url: btn.getAttribute('href'),
                        feature: `${MODULE_ID}-buildings`,
                    })
                    .then(({ status }) => {
                        if (status === 200) {
                            document
                                .querySelector(
                                    '.btn-alliance_costs.btn-success'
                                )
                                ?.classList.replace(
                                    'btn-success',
                                    'btn-default'
                                );
                            btn.classList.replace('btn-default', 'btn-success');
                            taxBtns.forEach(tbtn =>
                                tbtn.classList.remove('disabled')
                            );
                        }
                    });
            });
        });
    }

    // Extension State
    if (buildingSettings.includes('switchExtensionState')) {
        const newState = (btn: HTMLElement): boolean => {
            return btn.textContent != $m('buildings.active');
        };
        const extensionStateBtns = Array.from(
            document.querySelectorAll<HTMLAnchorElement>(
                'a[data-method="post"][href*="/extension_ready/"]'
            )
        );
        extensionStateBtns.forEach(btn => {
            btn.addEventListener('click', async e => {
                e.preventDefault();
                btn.removeAttribute('data-method');
                extensionStateBtns.forEach(tbtn =>
                    tbtn.classList.add('disabled')
                );
                const url = new URL(btn.href);
                url.searchParams.append('_method', 'post');
                url.searchParams.append(
                    'authenticity_token',
                    document
                        .querySelector('meta[name="csrf-token"]')
                        ?.getAttribute('content') || ''
                );
                await LSSM.$store
                    .dispatch('api/request', {
                        url: btn.getAttribute('href'),
                        init: {
                            method: 'POST',
                            body: url.searchParams.toString(),
                            headers: {
                                'Accept':
                                    'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
                                'Content-Type':
                                    'application/x-www-form-urlencoded',
                                'Upgrade-Insecure-Requests': '1',
                            },
                        },
                    })
                    .then(({ status }) => {
                        if (status === 200) {
                            extensionStateBtns.forEach(tbtn =>
                                tbtn.classList.remove('disabled')
                            );
                            btn.textContent = newState(btn as HTMLElement)
                                ? ($m('buildings.active') as string)
                                : ($m('buildings.nonactive') as string);
                            const label =
                                btn.parentElement?.querySelector('span');
                            if (!label) return;
                            label.textContent = newState(btn as HTMLElement)
                                ? ($m('buildings.active') as string)
                                : ($m('buildings.nonactive') as string);
                            // eslint-disable-next-line no-unused-expressions
                            label.classList.contains('label-danger')
                                ? label.classList.replace(
                                      'label-danger',
                                      'label-success'
                                  )
                                : label.classList.replace(
                                      'label-success',
                                      'label-danger'
                                  );
                        }
                    });
            });
        });
    }
};
