import type { RootScope } from '../main';

export default <Partial<Record<RootScope, Record<string, string>>>>{
    mission: {
        'transport_request': 'q',
        'prev': 'a',
        'next': 'd',
        'alert_share_next': 'e',
        'alert_next': 's',
        'share': 'w',
        'alert': 'x',
        'vehicleList.loadMissing': 'n',
    },
};

const breadcrumb = 'b';

export { breadcrumb };
