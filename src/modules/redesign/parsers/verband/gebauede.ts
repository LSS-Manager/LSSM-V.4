import verbandParser from './verbandParser';

import type { RedesignParser } from 'typings/modules/Redesign';
import type { VerbandWindow } from 'typings/modules/Redesign/Verband';

interface Extension {
    name: string;
    id: number;
    countdown: number;
}

interface Building {
    id: number;
    name: string;
    icon: string;
    lat: number;
    long: number;
    extensions: Extension[];
    canOpenSchooling: boolean;
}

export interface VerbandGebaeudeWindow extends VerbandWindow {
    buildings: Building[];
}

export default <RedesignParser<VerbandGebaeudeWindow>>(({
    doc,
    LSSM,
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
                    extensions: Array.from(
                        row.querySelectorAll<HTMLSpanElement>(
                            'td:nth-child(4) span.label'
                        )
                    ).map((extension, index) => {
                        if (!extension.parentElement) return null;
                        extension.id = LSSM.$store.getters.nodeAttribute(
                            `redesign-parser-gebauede-${id}-${index}`
                        );
                        const extensionID = parseInt(
                            extension.parentElement
                                .querySelector<HTMLSpanElement>(
                                    `#${extension.id} + br + i > span[id^="extension_countdown_"]`
                                )
                                ?.id?.replace(/^extension_countdown_/u, '') ??
                                '-1'
                        );
                        if (extensionID < 0) return null;
                        const countdown = Array.from(
                            extension.parentElement.querySelectorAll<HTMLScriptElement>(
                                `#${extension.id} + br + i + script`
                            )
                        )
                            .map(script =>
                                parseInt(
                                    script.textContent?.match(
                                        new RegExp(
                                            `(?<=extensionCountdown\\(\\s*)\\d+(?=\\s*,\\s*${extensionID}\\s*\\))`
                                        )
                                    )?.[0] ?? '-1'
                                )
                            )
                            .find(c => c >= 0);
                        if (!countdown) return null;
                        return {
                            name: extension.textContent?.trim() ?? '',
                            id: extensionID,
                            countdown,
                        };
                    }),
                    name: link.textContent?.trim() ?? '',
                    canOpenSchooling: !!row.querySelector<HTMLAnchorElement>(
                        `a.btn.btn-success[href="/buildings/${id}"]`
                    ),
                };
            }
        ),
    };
});
