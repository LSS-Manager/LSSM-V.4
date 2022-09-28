import type { RedesignParser } from 'typings/modules/Redesign';

export interface NextFMSWindow {
    next: number;
}

export default <RedesignParser<NextFMSWindow>>(({ doc }) => ({
    next: parseInt(
        doc
            .querySelector<HTMLAnchorElement>('#next-vehicle-fms-5')
            ?.href?.match(/\d+$/u)?.[0] ?? '-1'
    ),
}));
