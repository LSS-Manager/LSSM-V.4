import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

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
        .map(({ textContent }) => textContent?.trim() ?? '')
        .find(t => t.match(/L\.map/u));
    if (!markerScript)
        throw new Error('Could not find a script that sets the map!');
    return {
        ...verbandParser({ doc, getIdFromEl }),
        buildings: Array.from(
            markerScript.matchAll(
                /(?<=L\.marker\(\[)(?<lat>-?\d+(?:\.\d+)?)\s*,\s*(?<long>-?\d+(?:\.\d+)?)\](?:.|\n)*?(?<=\/buildings\/)(?<id>\d+)/gu
            )
        ).map(
            ({
                groups: { lat, long, id } = {},
            }: {
                groups?: Partial<Record<'id' | 'lat' | 'long', string>>;
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
                        .match(/(?<=educationCountdown\()\d+(?=,)/u)?.[0] ??
                        '-1'
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
