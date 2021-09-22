import { RedesignParser } from 'typings/modules/Redesign';

export interface FahrzeugfarbeWindow {
    color: string;
    vehicleType: number;
    customVehicleType: string | null;
}

export default <RedesignParser<FahrzeugfarbeWindow>>(({ doc, href = '' }) => {
    const url = new URL(href, window.location.origin);
    return {
        color: `#${doc.querySelector<HTMLInputElement>('#vehicle_color_color')
            ?.value ?? ''}`,
        vehicleType: parseInt(url.pathname.split('/')[2]),
        customVehicleType: url.searchParams.get('vehicle_type_caption'),
    };
});
