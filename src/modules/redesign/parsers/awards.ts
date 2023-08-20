import type { RedesignParser } from 'typings/modules/Redesign';

interface Award {
    caption: string;
    image: string;
    desc: string;
    finished: boolean;
    progress: [number, number] | null;
}

export interface AwardsWindow {
    awards: Award[];
}

export default <RedesignParser<AwardsWindow>>(({ doc }) => ({
    awards: Array.from(
        doc.querySelectorAll<HTMLDivElement>(
            '#collection .collection:not(.always-hidden)'
        )
    ).map(award => ({
        caption:
            award
                .querySelector<HTMLDivElement>('.grid-item-header .panel-title')
                ?.textContent?.trim() ?? '',
        image:
            award.querySelector<HTMLImageElement>('.grid-item-img img')?.src ??
            '',
        desc:
            Array.from(
                award.querySelector<HTMLDivElement>('.grid-item-text')
                    ?.childNodes ?? []
            )
                .find(
                    ({ nodeType, nextSibling }) =>
                        nodeType === 3 &&
                        nextSibling?.nodeType === 1 &&
                        (nextSibling as HTMLElement).matches(
                            'div.progress, div.line'
                        )
                )
                ?.textContent?.trim() ?? '',
        finished: !!award.querySelector<HTMLDivElement>('.label-award-gold'),
        progress:
            award
                .querySelector<HTMLDivElement>('.progress')
                ?.nextSibling?.textContent?.trim()
                .match(/\d+/gu)
                ?.map(n => parseInt(n)) ?? null,
    })),
}));
