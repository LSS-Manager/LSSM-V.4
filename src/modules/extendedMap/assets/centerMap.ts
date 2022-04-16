export default async (
    LSSM: Vue,
    getSetting: <Type = boolean>(setting: string) => Promise<Type>
) => {
    const type = await getSetting<'dynamic' | 'static'>('centerMapType');

    const reset = async () => {
        if (type === 'static') {
            const [lat, lng, zoom] = await getSetting<number[]>(
                'centerMapStaticLocation'
            );
            if ([lat, lng, zoom].filter(Boolean).length)
                window.map.setView([lat, lng], zoom);
        }
    };

    const resetIconWrapper = document.createElement('span');
    resetIconWrapper.classList.add('fa-layers', 'fa-fw', 'fa-2x');

    const mapIcon = document.createElement('i');
    mapIcon.classList.add('far', 'fa-map');
    mapIcon.style.setProperty('opacity', '0.6');

    const syncIcon = document.createElement('i');
    syncIcon.classList.add('fas', 'fa-sync');
    syncIcon.dataset.faTransform = 'shrink-5';

    resetIconWrapper.append(mapIcon, syncIcon);

    LSSM.$store
        .dispatch('addOSMControl', { position: 'top-left' })
        .then((control: HTMLAnchorElement) => {
            control.append(resetIconWrapper);
            control.addEventListener('click', reset);
            reset();
        });
};
