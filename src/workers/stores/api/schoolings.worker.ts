import TypedWorker from '@workers/TypedWorker';

import type { APIs } from '@stores/api';

export const SchoolingsWorker = new TypedWorker(
    'api/schoolings.worker',
    async (
        self,
        schoolings: APIs['schoolings'],
        alliance_schoolings: APIs['alliance_schoolings']
    ) => {
        const processedSchoolings = new Set<number>(schoolings.map(s => s.id));
        const allSchoolings = [...schoolings];
        for (const s of alliance_schoolings)
            if (!processedSchoolings.has(s.id)) allSchoolings.push(s);

        return { allSchoolings };
    },
    {}
);
