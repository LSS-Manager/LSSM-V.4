import type { RedesignParser } from 'typings/modules/Redesign';

export interface VehicleStatsWindow {
    data: number[];
}

export default <RedesignParser<VehicleStatsWindow>>(({ doc }) => ({
    data: (
        JSON.parse(
            Array.from(doc.scripts)
                .map(
                    script =>
                        script.textContent?.match(
                            /(?<=data\s*=\s*\{([\s\S])*?datasets:\s*\[\s*\{([\s\S])*?data:\s*)\[([\s\S])*?\]/u
                        )
                )
                .find(s => !!s)?.[0]
                ?.replace(/,(?=\W*\]$)/u, '') ?? '[]'
        ) as string[]
    ).map(km => parseFloat(km)),
}));
