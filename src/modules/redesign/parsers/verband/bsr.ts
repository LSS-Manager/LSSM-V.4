import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface BSR {
    id: number;
    name: string;
    owner: {
        id: number;
        name: string;
    };
    adress: string;
    lat: number;
    long: number;
    countdown: number;
}

export interface VerbandBSRWindow extends VerbandWindow {
    buildings: BSR[];
}

export default <RedesignParser<VerbandBSRWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => {
    const markerScript = Array.from(doc.scripts)
        .map(({ innerText }) => innerText.trim())
        .find(t => t.match(/L\.map/));
    if (!markerScript)
        throw new Error('Could not find a script that sets the map!');
    return {
        ...verbandParser({ doc, getIdFromEl }),
        buildings: Array.from(
            markerScript.matchAll(
                /(?<=L\.marker\(\[)(?<lat>\d+(?:\.\d+)?)\W*,\W*(?<long>\d+(?:\.\d+)?)(?=])(?=].*?\))(?:.|\n)*?(?<=\/buildings\/)(?<id>\d+)/g
            )
        ).map(
            ({
                groups: { lat, long, id } = {},
            }: {
                groups?: Partial<Record<'lat' | 'long' | 'id', string>>;
            }) => {
                if (!lat || !long || !id) {
                    throw new Error(
                        `Could not determine lat, long or id! ${JSON.stringify([
                            lat,
                            long,
                            id,
                        ])}`
                    );
                }
                const link = doc.querySelector<HTMLAnchorElement>(
                    `table tbody tr td a[href="/buildings/${id}"]`
                );
                const row = link?.parentElement?.parentElement;
                if (!link || !row)
                    throw new Error(`Could not find table row for id ${id}`);
                const owner = row.querySelector<HTMLAnchorElement>(
                    'td:nth-of-type(2) a[href^="/profile/"]'
                );
                const adress =
                    row.querySelector<HTMLAnchorElement>(
                        'td:nth-of-type(3) a[href="/verband/bereitstellungsraume"]'
                    )?.textContent ?? '';
                const countdown = parseInt(
                    row
                        .querySelector<HTMLScriptElement>('script')
                        ?.textContent?.trim()
                        .match(/(?<=educationCountdown\()\d+(?=,)/)?.[0] ?? '-1'
                );
                return <BSR>{
                    lat: parseFloat(lat),
                    long: parseFloat(long),
                    id: parseInt(id),
                    name: link.textContent?.trim() ?? '',
                    owner: {
                        id: getIdFromEl(owner),
                        name: owner?.textContent ?? '',
                    },
                    adress,
                    countdown,
                };
            }
        ),
    };
});
