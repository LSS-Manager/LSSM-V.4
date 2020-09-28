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

    // build extensions
    if (buildingSettings.includes('buildExtension')) {
        const newState = (btn: HTMLElement): boolean => {
            if (btn.innerText == $m('buildings.active')) {
                return false;
            } else {
                return true;
            }
        };
        const buildExtensionsButtons = Array.from(
            document.querySelectorAll(
                'a[data-method="post"][href*="/extension/"]'
            ) as NodeListOf<HTMLAnchorElement>
        );
        buildExtensionsButtons.forEach(btn => {
            btn.addEventListener('click', async e => {
                let time = 0;
                await LSSM.$store.dispatch('hook', {
                    event: 'extensionCountdown',
                    post: false,
                    callback(e: number, t: number) {
                        console.log('Im in');
                        if (time > e || (time = 0 && time < e)) {
                            time = e;
                        }
                        console.log(time);
                        console.log(new Date().getSeconds());
                    },
                });
                e.preventDefault();
                btn.removeAttribute('data-method');
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
                    .then(async ({ status }) => {
                        if (status === 200) {
                            btn.parentElement?.classList.add('hidden');
                            const td = btn.parentElement?.parentElement;
                            if (!td) return;

                            const infos = new URL(btn.href).pathname.split('/');
                            const span = document.createElement('span');
                            span.classList.add(
                                'extension_countdown_' + infos[2] + infos[5]
                            );
                            span.id =
                                'extension_countdown_' + infos[2] + infos[5];
                            span.innerText = '0';
                            const br = document.createElement('br');
                            const acoins = document.createElement('a');
                            acoins.classList.add('btn', 'btn-success');
                            acoins.setAttribute(
                                'href',
                                '/buildings/' +
                                    infos[2] +
                                    '/extension_finish/' +
                                    infos[5] +
                                    '?redirect_building_id=' +
                                    infos[2]
                            );
                            acoins.setAttribute('data-method', 'post');
                            acoins.setAttribute(
                                'data-confirm',
                                $m('buildings.confirmFinish') as string
                            );
                            acoins.setAttribute('rel', 'nofollow');
                            acoins.innerText = $m(
                                'buildings.extensionFinish'
                            ) as string;
                            const acancel = document.createElement('a');
                            acancel.classList.add(
                                'btn',
                                'btn-default',
                                'btn-xs'
                            );
                            acancel.setAttribute(
                                'href',
                                '/buildings/' +
                                    infos[2] +
                                    '/extension_cancel/' +
                                    infos[5] +
                                    '?redirect_building_id=' +
                                    infos[2]
                            );
                            acancel.setAttribute('data-method', 'post');
                            acancel.setAttribute('rel', 'nofollow');
                            acancel.innerText = $m(
                                'buildings.cancel'
                            ) as string;
                            const buildingType = document.querySelector(
                                'h1[building_type]'
                            );
                            const expansionTime = LSSM.$t(
                                'buildings[' +
                                    buildingType?.getAttribute(
                                        'building_type'
                                    ) +
                                    '].extensions[' +
                                    infos[5] +
                                    '].duration'
                            );
                            const days = parseInt(
                                (expansionTime as string).match(/\d+/)?.[0] ??
                                    '0'
                            );
                            const seconds = days * 24 * 60 * 60 + time;
                            console.log(seconds);
                            console.log(seconds - time);
                            window.extensionCountdown(
                                seconds,
                                parseInt(infos[2] + infos[5])
                            );
                            if (time != 0) {
                                const cancelBtns = document.querySelectorAll(
                                    'a[href*="/extension_cancel/"]'
                                );
                                cancelBtns.forEach(cbtn => {
                                    cbtn.classList.add('hidden');
                                });
                            }
                            td.innerText = $m(
                                'buildings.remainingTime'
                            ) as string;
                            td.appendChild(span);
                            td.appendChild(br);
                            td.appendChild(acoins);
                            td.appendChild(acancel);
                        }
                    });
            });
        });
    }
};
