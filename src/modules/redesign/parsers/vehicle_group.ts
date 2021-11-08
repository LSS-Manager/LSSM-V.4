import { RedesignParser } from 'typings/modules/Redesign';

export interface VehicleGroupWindow {
    id: number;
    caption: string;
    color: string;
    column: '0' | '1' | '2' | '3' | '4' | '5' | '6';
    category: string;
    category_options: Record<string, string>;
    hotkey: string;
    hotkey_options: string[];
    vehicles: number[];
}

export default <RedesignParser<VehicleGroupWindow>>(({ doc, href = '' }) => {
    const form = doc.querySelector<HTMLFormElement>(
        'form[id^="edit_vehicle_group_"]'
    );
    return {
        id: parseInt(
            new URL(href, window.location.origin).pathname.match(/\d+/)?.[0] ??
                '-1'
        ),
        caption:
            form?.querySelector<HTMLInputElement>(
                'input[name="vehicle_group[caption]"]'
            )?.value ?? '',
        color:
            form?.querySelector<HTMLInputElement>(
                'input[name="vehicle_group[color]"]'
            )?.value ?? '',
        column:
            (form?.querySelector<HTMLSelectElement>(
                'select[name="vehicle_group[column_number]"]'
            )?.value ||
                undefined) ??
            '0',
        category:
            form?.querySelector<HTMLInputElement>(
                'select[name="vehicle_group[aao_category_id]"]'
            )?.value ?? '',
        category_options: Object.fromEntries(
            Array.from(
                doc?.querySelectorAll<HTMLOptionElement>(
                    'select[name="vehicle_group[aao_category_id]"] option'
                ) ?? []
            ).map(({ value, textContent }) => [
                value,
                textContent?.trim() ?? '',
            ])
        ),
        hotkey:
            form?.querySelector<HTMLInputElement>(
                'select[name="vehicle_group[hotkey]"]'
            )?.value ?? '',
        hotkey_options: Array.from(
            doc?.querySelectorAll<HTMLOptionElement>(
                'select[name="vehicle_group[hotkey]"] option'
            ) ?? []
        ).map(({ textContent }) => textContent?.trim() ?? ''),
        vehicles: Array.from(
            doc.querySelectorAll<HTMLInputElement>(
                '.vehicle_group_vehicles :checked'
            )
        ).map(({ value }) => parseInt(value)),
    };
});
