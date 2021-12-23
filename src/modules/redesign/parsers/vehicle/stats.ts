import { RedesignParser } from 'typings/modules/Redesign';

export interface VehicleStatsWindow {
    data: number[];
}

export default <RedesignParser<VehicleStatsWindow>>(({ doc }) => ({
    data: (JSON.parse(
        Array.from(doc.scripts)
            .map(script =>
                script.textContent?.match(
                    /(?<=data\s*?=\s*?{(.|\n)*?datasets:\s*?\[\s*?{(.|\n)*?data:\s*?)\[(.|\n)*?]/ms
                )
            )
            .find(s => !!s)?.[0]
            ?.replace(/,(?=\W*]$)/, '') ?? '[]'
    ) as string[]).map(km => parseFloat(km)),
}));
