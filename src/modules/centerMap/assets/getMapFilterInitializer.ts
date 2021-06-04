export interface MapFilterInitializer {
    user_id: number;
    sorted_map_filters: {
        filter_id: string;
        text: string;
        checked: boolean;
        icon_url: string;
    }[];
    building_types_collection: Record<string, string>;
    mission_types_collection: string[];
    mission_types_with_filter_ids: Record<string, string>;
}

export const mapFilterInitializer: MapFilterInitializer = JSON.parse(
    Array.from(document.scripts)
        .find(({ innerText }) =>
            innerText.match(/map_filters_service\.initialize/)
        )
        ?.innerText.match(
            /(?<=map_filters_service\.initialize\(\s*?){(.|\n)*?}(?=\s*\))/
        )?.[0]
        .replace(/(?<=\W)(?<!")\w+(?=:)/g, $0 => `"${$0}"`) ?? '{}'
);
