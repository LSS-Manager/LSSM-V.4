import { RedesignParser } from 'typings/modules/Redesign';

interface Application {
    user: {
        id: number;
        name: string;
    };
    id: number;
}

export interface BewerbungenWindow {
    applications: Application[];
    editSettings: boolean;
}

export default <RedesignParser<BewerbungenWindow>>(({
    doc,
    getIdFromEl = () => -1,
}) => ({
    applications: Array.from(
        doc.querySelectorAll<HTMLTableRowElement>('table tbody tr')
    ).map(row => {
        const user = row.querySelector<HTMLAnchorElement>(
            'a[href^="/profile/"]'
        );
        return <Application>{
            user: {
                id: getIdFromEl(user),
                name: user?.textContent?.trim() ?? '',
            },
            id: getIdFromEl(
                row.querySelector<HTMLAnchorElement>(
                    'a[href^="/verband/bewerbungen/annehmen/"]'
                )
            ),
        };
    }),
    editSettings: !!doc.querySelector<HTMLAnchorElement>(
        'a[href="/alliance_candidature_setting/edit"]'
    ),
}));
