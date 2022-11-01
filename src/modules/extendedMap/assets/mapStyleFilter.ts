export default async (
    LSSM: Vue,
    getSetting: <Type = boolean>(setting: string) => Promise<Type>
) => {
    const invert = await getSetting<number>('mapStyleFilterInvert');
    const grey = await getSetting<number>('mapStyleFilterGrey');
    const brightness = await getSetting<number>('mapStyleFilterBrightness');
    const contrast = await getSetting<number>('mapStyleFilterContrast');
    const saturate = await getSetting<number>('mapStyleFilterSaturate');
    const sepia = await getSetting<number>('mapStyleFilterSepia');
    LSSM.$stores.root.addStyle({
        selectorText: '#map',
        style: {
            filter: `invert(${invert}) grayscale(${grey}) brightness(${brightness}) contrast(${contrast}) saturate(${saturate}) sepia(${sepia})`,
        },
    });
};
