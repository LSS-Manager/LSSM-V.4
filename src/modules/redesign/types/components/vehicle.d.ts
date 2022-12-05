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

interface Filter {
    filter: boolean;
    hidden: boolean;
}

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
            };
        };
        apiStore: ReturnType<typeof useAPIStore>;
        settingsStore: ReturnType<typeof useSettingsStore>;
        starredMissionsEnabled: boolean;
        starredMissions: string[];
    },
    {
        getUrl(item: ItemChooser<'item'>): string;
        // setList<Item = ItemChooser<'item'>>(
        //     _: unknown,
        //     group: Item extends { list: string } ? Item['list'] : ''
        // ): void;
        // setSearch(search: string): void;
        // setSort(type: ItemChooser<'sort'>): void;
        alarm(missionId: Mission['id']): void;
        // approach(url: string, followRedirect?: boolean): void;
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
        // loadAllHospitals(): void;
        updateStarredMissions(): Promise<string[]>;
        switchStarredMission(missionId: Mission['id']): void;
    },
    {
        tableType: keyof Types;
        navigationBtnClass: Record<'next' | 'prev', string>;
        tableHead: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;

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
