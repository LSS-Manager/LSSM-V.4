import { RedesignParser } from 'typings/modules/Redesign';

export interface NextFMSWindow {
    next: number;
}

export default <RedesignParser<NextFMSWindow>>(({ doc }) => ({
    next: parseInt(
        doc
            .querySelector<HTMLAnchorElement>(
                'a.btn.btn-success[href^="/vehicles/"]'
            )
            ?.href?.match(/\d+$/)?.[0] ?? '-1'
    ),
}));
