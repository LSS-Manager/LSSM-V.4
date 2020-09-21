import { $m } from 'typings/Module';

export default (LSSM: Vue, buildingSettings: string[], $m: $m): void => {
    const BUILDING_MODE = document.getElementById('ausbauten')
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
            if (btn.innerText == $m('buildings.active')) {
                return false;
            } else {
                return true;
            }
        };
        const extensionStateBtns = Array.from(
            document.querySelectorAll(
                'a[data-method="post"][href*="/extension_ready/"]'
            ) as NodeListOf<HTMLAnchorElement>
        );
        console.log(extensionStateBtns);
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
                            btn.innerText = newState(btn as HTMLElement)
                                ? ($m('buildings.active') as string)
                                : ($m('buildings.nonactive') as string);
                            const label = btn.parentElement?.querySelector(
                                'span'
                            );
                            if (!label) return;
                            label.innerText = newState(btn as HTMLElement)
                                ? ($m('buildings.active') as string)
                                : ($m('buildings.nonactive') as string);
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
