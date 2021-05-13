import { RedesignParser } from 'typings/modules/Redesign';

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

export default <RedesignParser<AwardsWindow>>(({ doc, href = '' }) => ({
    awards: Array.from(
        doc.querySelectorAll<HTMLDivElement>('.col-sm-3 > .panel')
    ).map(award => ({
        caption:
            award
                .querySelector<HTMLDivElement>('.panel-heading .panel-title')
                ?.textContent?.trim() ?? '',
        image:
            award.querySelector<HTMLImageElement>('.panel-body img')?.src ?? '',
        desc:
            Array.from(
                award.querySelector<HTMLDivElement>('.panel-body')
                    ?.childNodes ?? []
            )
                .find(
                    ({ nodeType, nextSibling }) =>
                        nodeType === 3 &&
                        nextSibling?.nodeType === 1 &&
                        (nextSibling as HTMLElement).matches(
                            'div.progress, div.label-award-gold'
                        )
                )
                ?.textContent?.trim() ?? '',
        finished: !!award.querySelector<HTMLDivElement>('.label-award-gold'),
        progress:
            award
                .querySelector<HTMLDivElement>('.progress')
                ?.nextSibling?.textContent?.trim()
                .match(/\d+/g)
                ?.map(n => parseInt(n)) ?? null,
    })),
}));
