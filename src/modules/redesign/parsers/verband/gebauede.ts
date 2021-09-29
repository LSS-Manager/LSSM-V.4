import verbandParser from './verbandParser';

import { RedesignParser } from 'typings/modules/Redesign';
import { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface Building {
    id: number;
    name: string;
    icon: string;
    lat: number;
    long: number;
    canOpenSchooling: boolean;
}

export interface VerbandGebaeudeWindow extends VerbandWindow {
    buildings: Building[];
}

export default <RedesignParser<VerbandGebaeudeWindow>>(({
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
                const icon =
                    row
                        .querySelector<HTMLImageElement>('img')
                        ?.getAttribute('src') ??
                    '/images/building_fire_other.png';
                return <Building>{
                    lat: parseFloat(lat),
                    long: parseFloat(long),
                    id: parseInt(id),
                    icon,
                    name: link.textContent?.trim() ?? '',
                    canOpenSchooling: !!row.querySelector<HTMLAnchorElement>(
                        `a.btn.btn-success[href="/buildings/${id}"]`
                    ),
                };
            }
        ),
    };
});
