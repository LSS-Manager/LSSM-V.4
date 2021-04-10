import { RedesignParser } from 'typings/modules/Redesign';

export default <RedesignParser<number>>(source => {
    return parseInt(
        new DOMParser()
            .parseFromString(source, 'text/html')
            .querySelector<HTMLAnchorElement>(
                'a.btn.btn-success[href^="/vehicles/"]'
            )
            ?.href?.match(/\d+$/)?.[0] ?? '-1'
    );
});
