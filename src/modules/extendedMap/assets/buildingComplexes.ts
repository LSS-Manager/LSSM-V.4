export interface Complex {
    name: string;
    buildings: string[];
    position: [number, number];
}

export default (LSSM: Vue, complexes: Complex[]) => {
    if (!window.map) return;

    // TODO: Create extra layer for building complexes

    complexes.forEach(({ position, name, buildings }, index) => {
        const marker = window.L.marker(position, {
            zIndexOffset: 5000,
            title: name,
            icon: window.icon_empty,
        })
            .bindTooltip(name)
            .addTo(window.map);

        window.iconMapGenerate('/images/logo-header.png', marker);

        const modalName = `building-complex-${index}`;

        marker.on('click', () =>
            LSSM.$modal.show(
                () =>
                    import(
                        /* webpackChunkName: "modules/extendedMap/components/buildingComplexes" */ '../components/buildingComplex.vue'
                    ),
                {
                    complexIndex: index,
                    modalName,
                    name,
                    buildingIds: buildings,
                },
                {
                    name: modalName,
                    height: '96%',
                    width: '96%',
                }
            )
        );
    });
};
