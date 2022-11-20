import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import type { StarrableButton } from '../../../extendedCallList/assets/starrableMissions/createBtn';
import type { useSettingsStore } from '@stores/settings';
import type { VehicleWindow } from '../../parsers/vehicle';
import type {
    RedesignComponent,
    RedesignVueInstance,
} from 'typings/modules/Redesign';

type FilteredMission = VehicleWindow['mission_own'][number] & {
    participation: boolean;
    credits: number;
    filter: boolean;
    hidden: boolean;
};
type FilteredHospital = VehicleWindow['own_hospitals'][number] & {
    filter: boolean;
    hidden: boolean;
};
type FilteredCell = VehicleWindow['own_cells'][number] & {
    filter: boolean;
    hidden: boolean;
};
type FilteredWLF = VehicleWindow['wlfs'][number] & {
    filter: boolean;
    hidden: boolean;
};

export type RedesignVehicleComponent = RedesignComponent<
    'vehicle',
    'vehicle',
    {
        faSitemap: IconDefinition;
        faPortrait: IconDefinition;
        faUser: IconDefinition;
        faAsterisk: IconDefinition;
        faPalette: IconDefinition;
        faEdit: IconDefinition;
        faChartLine: IconDefinition;
        faUsers: IconDefinition;
        faTrash: IconDefinition;
        faBan: IconDefinition;
        missionListSrc: number;
        search: string;
        searchTimeout: number | null;
        sort: string;
        sortDir: 'asc' | 'desc';
        hospitalListSrc: number;
        cellListSrc: number;
        releaseDisables: ('patient' | 'prisoner')[];
        color2Class: {
            red: 'danger';
            yellow: 'warning';
            green: 'success';
        };
        filter: {
            mission: {
                status: ('green' | 'red' | 'yellow')[];
                participation: boolean[];
                distance: number;
                credits: number;
                progress: number;
            };
            hospital: {
                department: boolean[];
                distance: number;
                tax: number;
                beds: number;
                each: number;
            };
            cell: {
                distance: number;
                tax: number;
                free: number;
                each: number;
            };
            wlf: {
                distance: number;
                same: boolean[];
                show: number;
            };
        };
        settingsStore: ReturnType<typeof useSettingsStore>;
        starredMissionsEnabled: boolean;
        starredMissions: string[];
    },
    {
        setMissionList(_: unknown, group: number): void;
        setHospitalList(_: unknown, group: number): void;
        setCellList(_: unknown, group: number): void;
        setSearch(search: string): void;
        setSort(type: string): void;
        alarm(missionId: number): void;
        deleteVehicle(): void;
        backalarm(): void;
        backalarmFollowUp(missionId: number): void;
        backalarmCurrent(): void;
        switch_state(): void;
        updateFilter(filter: string, value: unknown): void;
        fms(url: string, wlf?: boolean): void;
        release(type: 'patient' | 'prisoner'): void;
        loadAllHospitals(): void;
        updateStarredMissions(): Promise<string[]>;
        switchStarredMission(missionId: string): void;
    },
    {
        participated_missions: number[];
        mission_head: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        missionList: VehicleWindow['mission_own'];
        missionListFiltered: FilteredMission[];
        missionListSorted: FilteredMission[];
        hospital_head: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        hospitalList: VehicleWindow['own_hospitals'];
        hospitalListFiltered: FilteredHospital[];
        hospitalListSorted: FilteredHospital[];
        cell_head: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        cellList: VehicleWindow['own_cells'];
        cellListFiltered: FilteredCell[];
        cellListSorted: FilteredCell[];
        wlf_head: Record<
            string,
            {
                title: string;
                noSort?: boolean;
            }
        >;
        wlfListFiltered: FilteredWLF[];
        wlfListSorted: FilteredWLF[];
        hotkeysParam: {
            component: RedesignVueInstance<RedesignVehicleComponent>;
            data: Record<string, never>;
            methods: {
                alarm: RedesignVehicleComponent['Methods']['alarm'];
            };
            computed: {
                missionListSorted: RedesignVehicleComponent['Computed']['missionListSorted'];
            };
        };
        starredMissionButtons: Record<string, StarrableButton>;
    }
>;
