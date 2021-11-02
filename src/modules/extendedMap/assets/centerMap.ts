export default async (
    getSetting: <Type = boolean>(setting: string) => Promise<Type>,
    type: 'dynamic' | 'static'
) => {
    if (type === 'static') {
        const [lat, lng, zoom] = await getSetting<number[]>(
            'centerMapStaticLocation'
        );
        if ([lat, lng, zoom].filter(n => n).length)
            window.map.setView([lat, lng], zoom);
    }
};
