import type { $m } from 'typings/Module';

export interface Complex {
    name: string;
    buildings: string[];
    position: [number, number];
    icon: string;
}

export default (MODULE_ID: string, LSSM: Vue, complexes: Complex[], $m: $m) => {
    if (!window.map) return;

    // TODO: Create extra layer for building complexes

    complexes.forEach((complex, index) => {
        const { position, name, icon } = complex;
        const marker = window.L.marker(position, {
            zIndexOffset: 5000,
            title: name,
            icon: window.icon_empty,
        })
            .bindTooltip(name)
            .addTo(window.map);

        window.iconMapGenerate(icon, marker);

        const modalName = `building-complex-${index}`;

        const showModal = () =>
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/extendedMap/components/buildingComplexes/buildingComplex" */ '../components/buildingComplexes/buildingComplex.vue'
                    ),
                {
                    complexIndex: index,
                    modalName,
                    complex: complexes[index],
                    $m: <$m>(
                        ((key, args) => $m(`buildingComplexes.${key}`, args))
                    ),
                    updateComplex(updatedComplex: Complex) {
                        complexes[index] = updatedComplex;

                        if (updatedComplex.icon !== icon)
                            window.iconMapGenerate(updatedComplex.icon, marker);

                        marker.unbindTooltip();
                        marker.bindTooltip(updatedComplex.name);
                        marker.setLatLng(updatedComplex.position);

                        LSSM.$store
                            .dispatch('settings/setSetting', {
                                moduleId: MODULE_ID,
                                settingId: 'buildingComplexes',
                                value: {
                                    enabled: true,
                                    value: complexes,
                                },
                            })
                            .then(() => {
                                LSSM.$modal.hide(modalName);
                                showModal();
                            });
                    },
                },
                {
                    name: modalName,
                    height: '96%',
                    width: '96%',
                }
            );

        marker.on('click', () => showModal());
    });
};
