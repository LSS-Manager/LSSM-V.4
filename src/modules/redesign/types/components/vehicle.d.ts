import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { StarrableButton } from '../../../extendedCallList/assets/starrableMissions/createBtn';
import type { useAPIStore } from '@stores/api';
import type { useSettingsStore } from '@stores/settings';
import type {
    Cell,
    Hospital,
    Mission,
    ShoreStation,
    TowingVehicle,
    TransportRequestWindow,
} from '../../parsers/vehicle';
import type {
    RedesignComponent,
    RedesignVueInstance,
} from 'typings/modules/Redesign';

export type KebabToCamelCase<S extends string> =
    S extends `${infer T}-${infer U}`
        ? `${T}${Capitalize<KebabToCamelCase<U>>}`
        : S;

interface Types {
    mission: {
        item: Mission;
        filter: {
            status: ('green' | 'red' | 'yellow')[];
            participation: boolean[];
            distance: number;
            credits: number;
            progress: number;
        };
        sort:
            | 'caption'
            | 'credits'
            | 'distance'
            | 'list'
            | 'participation'
            | 'patients'
            | 'progress';
    };
    patient: {
        item: Hospital;
        filter: {
            distance: number;
            freeBeds: number;
            tax: number;
            department: boolean[];
        };
        sort:
            | 'caption'
            | 'department'
            | 'distance'
            | 'freeBeds'
            | 'list'
            | 'tax';
        additional: {
            disableReleaseConfirmation: boolean;
            showEach: number;
        };
    };
    prisoner: {
        item: Cell;
        filter: {
            distance: number;
            freeCells: number;
            tax: number;
        };
        sort: 'caption' | 'distance' | 'freeCells' | 'list' | 'tax';
        additional: {
            disableReleaseConfirmation: boolean;
            showEach: number;
        };
    };
    trailer: {
        item: TowingVehicle;
        filter: {
            distance: number;
            same: boolean[];
        };
        sort: 'building' | 'caption' | 'distance' | 'same';
    };
    patientIntermediate: {
        item: ShoreStation;
        filter: {
            distance: number;
            home: boolean[];
        };
        sort: 'caption' | 'distance' | 'home' | 'list';
        additional: {
            disableReleaseConfirmation: boolean;
            showEach: number;
        };
    };
    prisonerIntermediate: {
        item: ShoreStation;
        filter: {
            distance: number;
            home: boolean[];
        };
        sort: 'caption' | 'distance' | 'home' | 'list';
        additional: {
            disableReleaseConfirmation: boolean;
            showEach: number;
        };
    };
}

type ItemChooser<
    Type extends keyof Types[keyof Types],
    Window = RedesignVehicleComponent['Props']['vehicle'],
> = (Window extends TransportRequestWindow
    ? Types[KebabToCamelCase<Window['transportRequestType']>]
    : Types['mission'])[Type];

type DistributeListUnion<Item extends ItemChooser<'item'>> =
    Item extends Record<'list', infer List extends string> ? List | '*' : never;

export type RedesignVehicleComponent = RedesignComponent<
    'vehicle',
    'vehicle',
    {
        listIcon: {
            own: IconDefinition;
            alliance: IconDefinition;
        };
        participationIcon: {
            true: IconDefinition;
            false: IconDefinition;
        };
        faPalette: IconDefinition;
        faEdit: IconDefinition;
        faChartLine: IconDefinition;
        faUsers: IconDefinition;
        faTrash: IconDefinition;
        faBan: IconDefinition;
        search: string;
        searchTimeout: number;
        color2Class: {
            red: 'danger';
            yellow: 'warning';
            green: 'success';
        };
        tables: {
            [key in keyof Types]: (Types[key] extends {
                additional: Record<never, never>;
            }
                ? Types[key]['additional']
                : Record<never, never>) & {
                filter: Types[key]['filter'];
                sort: Types[key]['sort'];
                sortDir: 'asc' | 'desc';
                list: DistributeListUnion<Types[key]['item']> | '*';
            };
        };
        apiStore: ReturnType<typeof useAPIStore>;
        settingsStore: ReturnType<typeof useSettingsStore>;
        starredMissionsEnabled: boolean;
        starredMissions: string[];
    },
    {
        getUrl(item: ItemChooser<'item'>): string;
        setList(_: unknown, group: number): void;
        clickListTab(): void;
        setSort(type: ItemChooser<'sort'>): void;
        alarm(missionId: Mission['id']): void;
        dispatch(id: ItemChooser<'item'>['id']): void;
        approach(url: string, followRedirect?: boolean): void;
        deleteVehicle(): void;
        backalarm(): void;
        backalarmFollowUp(missionId: number): void;
        backalarmCurrent(): void;
        switchState(): void;
        updateShowEach(): void;
        updateFilter(filter: keyof ItemChooser<'filter'>): void;
        release(): void;
        loadAllHospitals(): void;
        updateStarredMissions(): Promise<string[]>;
        switchStarredMission(missionId: Mission['id']): void;
    },
    {
        tableType: keyof Types;
        table: RedesignVehicleComponent['Data']['tables'][RedesignVehicleComponent['Computed']['tableType']];
        navigationBtnClass: Record<'next' | 'prev', string>;
        tableHead: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        // at the moment, this always results in a list of all possible lists, independent of the current table type
        lists: DistributeListUnion<ItemChooser<'item'>>[];

        items: ItemChooser<'item'>[];
        filteredItems: ItemChooser<'item'>[];
        sortedItems: ItemChooser<'item'>[];
        shownItems: ItemChooser<'item'>[];

        participatedMissions: number[];

        hotkeysParam: {
            component: RedesignVueInstance<RedesignVehicleComponent>;
            data: Record<string, never>;
            methods: {
                alarm: RedesignVehicleComponent['Methods']['alarm'];
            };
            computed: {
                sortedItems: {
                    [Key in keyof Types]: Types[Key]['item'][];
                };
            };
        };

        starredMissionButtons: Record<string, StarrableButton>;
    }
>;
