import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { StarrableButton } from '../../../extendedCallList/assets/starrableMissions/createBtn';
import type { useAPIStore } from '@stores/api';
import type { useSettingsStore } from '@stores/settings';
import type {
    Cell,
    Hospital,
    Mission,
    TowingVehicle,
    TransportRequestWindow,
} from '../../parsers/vehicle';
import type {
    RedesignComponent,
    RedesignVueInstance,
} from 'typings/modules/Redesign';

type Filter = Record<never, never>;
// interface Filter {
//     filter: boolean;
//     hidden: boolean;
// }

type FilteredMission = Filter & Mission;
type FilteredHospital = Filter & Hospital;
type FilteredCell = Cell & Filter;
type FilteredTowingVehicle = Filter & TowingVehicle;

interface Types {
    mission: {
        item: Mission;
        filteredItem: FilteredMission;
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
        filteredItem: FilteredHospital;
        filter: {
            department: boolean[];
            distance: number;
            tax: number;
            beds: number;
            show: number;
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
        };
    };
    prisoner: {
        item: Cell;
        filteredItem: FilteredCell;
        filter: {
            distance: number;
            tax: number;
            free: number;
            show: number;
        };
        sort: 'caption' | 'distance' | 'freeCells' | 'list' | 'tax';
        additional: {
            disableReleaseConfirmation: boolean;
        };
    };
    trailer: {
        item: TowingVehicle;
        filteredItem: FilteredTowingVehicle;
        filter: {
            distance: number;
            same: boolean[];
            show: number;
        };
        sort: 'building' | 'caption' | 'distance' | 'same';
    };
}

type ItemChooser<
    Type extends keyof Types[keyof Types],
    Window = RedesignVehicleComponent['Props']['vehicle']
> = (Window extends TransportRequestWindow
    ? Types[Window['transportRequestType']]
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
        // setSearch(search: string): void;
        // setSort(type: ItemChooser<'sort'>): void;
        alarm(missionId: Mission['id']): void;
        dispatch(id: ItemChooser<'item'>['id']): void;
        approach(url: string, followRedirect?: boolean): void;
        deleteVehicle(): void;
        backalarm(): void;
        backalarmFollowUp(missionId: number): void;
        backalarmCurrent(): void;
        switchState(): void;
        // updateFilter<
        //     Filters = ItemChooser<'filter'>,
        //     Filter extends keyof Filters = keyof Filters
        // >(
        //     filter: Filter,
        //     value: Filters[Filter]
        // ): void;
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
        filteredItems: ItemChooser<'filteredItem'>[];
        // sortedItems: ItemChooser<'filteredItem'>[];

        participatedMissions: number[];

        hotkeysParam: {
            component: RedesignVueInstance<RedesignVehicleComponent>;
            data: Record<string, never>;
            methods: {
                alarm: RedesignVehicleComponent['Methods']['alarm'];
            };
            computed: {
                missionsSorted: FilteredMission[];
            };
        };

        starredMissionButtons: Record<string, StarrableButton>;
    }
>;
