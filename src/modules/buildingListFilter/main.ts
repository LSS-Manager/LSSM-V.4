import { ModuleMainFunction } from 'typings/Module';

export default <ModuleMainFunction>(async (LSSM, MODULE_ID) => {
    const filters: {
        contentType: 'text' | 'icon';
        icon_style: 'fas' | 'far' | 'fab';
        title: string;
        buildings: number[];
        state: 'enabled' | 'disabled';
    }[] = (
        await LSSM.$store.dispatch('settings/getSetting', {
            moduleId: MODULE_ID,
            settingId: 'filters',
        })
    ).value;

    const enable = (
        btn: HTMLButtonElement,
        buildings: number[],
        index: number
    ) => {
        btn.classList.replace('btn-danger', 'btn-success');
        document
            .querySelectorAll<HTMLDivElement>(
                buildings
                    .map(
                        b =>
                            `#buildings .building_list_li[building_type_id="${b}"]`
                    )
                    .join(',')
            )
            .forEach(b => {
                b.classList.add('category_selected');
                b.style.setProperty('display', 'block');
            });
        filters[index].state = 'enabled';
    };
    const disable = (
        btn: HTMLButtonElement,
        buildings: number[],
        index: number
    ) => {
        btn.classList.replace('btn-success', 'btn-danger');
        document
            .querySelectorAll<HTMLDivElement>(
                buildings
                    .map(
                        b =>
                            `#buildings .building_list_li[building_type_id="${b}"]`
                    )
                    .join(',')
            )
            .forEach(b => {
                b.classList.remove('category_selected');
                b.style.setProperty('display', 'none');
            });
        filters[index].state = 'disabled';
    };

    const updateSettings = () =>
        LSSM.$store.dispatch('settings/setSetting', {
            moduleId: MODULE_ID,
            settingId: 'filters',
            value: { value: filters, enabled: true },
        });

    const updateFilters = () => {
        const wrapper = document.getElementById('btn-group-building-select');
        if (!wrapper) return;
        wrapper.querySelectorAll('a').forEach(a => a.remove());
        const btns: [HTMLButtonElement, number[]][] = [];

        filters.forEach(
            ({ contentType, title, icon_style, buildings, state }, index) => {
                const btn = document.createElement('button');
                btn.classList.add('btn', 'btn-xs', 'btn-success');
                if (contentType === 'text') {
                    btn.innerText = title;
                } else {
                    const icon = document.createElement('i');
                    icon.classList.add(icon_style, `fa-${title}`);
                    btn.append(icon);
                }
                btn.addEventListener('click', () => {
                    if (btn.classList.contains('btn-danger'))
                        enable(btn, buildings, index);
                    else disable(btn, buildings, index);
                    updateSettings();
                    window.buildingsVehicleLoadVisible();
                });
                btn.addEventListener('dblclick', () => {
                    btns.forEach(([btnI, buildings], index) => {
                        if (btnI === btn) enable(btnI, buildings, index);
                        else disable(btnI, buildings, index);
                        updateSettings();
                        window.buildingsVehicleLoadVisible();
                    });
                });
                if (state === 'disabled') disable(btn, buildings, index);
                btns.push([btn, buildings]);
                wrapper.append(btn);
            }
        );
    };

    const observer = new MutationObserver(updateFilters);

    const buildingsElement = document.getElementById('buildings');
    if (buildingsElement)
        observer.observe(buildingsElement, { childList: true });

    updateFilters();
});
