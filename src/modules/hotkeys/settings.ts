import getCommandName from './assets/getCommandName';

import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    HotKey,
    Select,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    const commands: string[] = [
        'main.chat.focus',
        'main.map.search.focus',
        'main.map.zoom.in',
        'main.map.zoom.out',
        'main.map.move.up',
        'main.map.move.down',
        'main.map.move.left',
        'main.map.move.right',
        'main.missionlist.search.focus',
        'main.missionlist.eclSort.open',
        'main.lssm.menu.toggle',
        'main.bigMap.toggle.missions',
        'main.bigMap.toggle.buildings',
        'main.bigMap.toggle.chat',
        'main.bigMap.toggle.radio',
        '*.credits.open',
        '*.credits.daily',
        '*.credits.overview',
        '*.tasks.open',
        '*.profile.open',
        '*.profile.level',
        '*.profile.awards',
        '*.profile.notes',
        '*.alliance.open',
        '*.alliance.members',
        '*.alliance.onlineMembers',
        '*.alliance.buildings',
        '*.alliance.funds',
        '*.alliance.forum',
        '*.alliance.schoolings',
        '*.alliance.messages',
        '*.alliance.applications',
        '*.alliance.logfiles',
        '*.protocol',
        'mission.transport_request',
        'mission.alert_next',
        'mission.prev',
        'mission.next',
        'mission.alert_share_next',
        'mission.share',
        'mission.alert',
        'mission.sorted.alert_next',
        'mission.sorted.prev',
        'mission.sorted.next',
        'mission.sorted.alert_share_next',
        'mission.alliance.focus',
        'mission.alliance.toggle',
        'mission.arr.next',
        'mission.arr.previous',
        'mission.vehicleList.next',
        'mission.vehicleList.previous',
        'mission.vehicleList.loadMissing',
        'mission.vehicleList.reset',
        'mission.backalarm.allVehicles',
        'mission.backalarm.onlyAmbulance',
        'mission.backalarm.abortApproach',
        'mission.missionHelper.toggleCollapse',
        'mission.emv.toggleCollapse',
        'building.goto.previousBuilding',
        'building.goto.nextBuilding',
        'building.goto.dispatchCenter',
        'building.goto.expand',
        'building.goto.firstVehicle',
        'building.goto.hire',
        'building.goto.personal',
        'building.changeSharing.enableSharing',
        'building.changeSharing.disableSharing',
        'building.changeSharing.toggleSharing',
        'building.dispatch.next',
        'building.dispatch.previous',
        'building.dispatch.plannedMission',
        'building.dispatch.protocol',
        'building.dispatch.stats',
        'building.dispatch.buildings',
        'building.dispatch.extensions',
        'building.dispatch.vehicle',
        'building.dispatch.schooling',
        'building.dispatch.patrol_vehicles',
        'building.dispatch.patrol',
        'building.dispatch.settings',
        'building.dispatch.openFirstPlannedMission',
        'vehicles.goto.nextVehicle',
        'vehicles.goto.building',
        'vehicles.goto.previousVehicle',
        'vehicles.goto.edit',
        'vehicles.goto.personalAssigment',
        'vehicles.goto.statistics',
        'vehicles.alarm.firstOwnMission',
        'vehicles.alarm.firstAllianceMission',
        'vehicles.other.moveVehicle',
        'vehicles.other.toggleFMS',
        'schoolings.educate',
    ].sort();
    const labels: string[] = commands.map(command =>
        getCommandName(command, $m)
    );

    interface SettingRow {
        command: string;
        hotkey: string;
    }

    const uniquenessCheck = (
        row: SettingRow,
        rowIndex: number,
        settings: SettingRow[]
    ) => {
        if (!row.command || !row.hotkey) return false;
        const scope = row.command.split('.')[0];
        const sameHotkeys = settings
            .filter((_, i) => i !== rowIndex)
            .filter(({ hotkey }) => hotkey === row.hotkey)
            .filter(
                ({ command }) =>
                    scope === '*' ||
                    command.startsWith(`${scope}.`) ||
                    command.startsWith('*.')
            );
        if (sameHotkeys.length === 0) return false;
        return $m('unique').toString();
    };

    return {
        hotkeys: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'command',
                    title: $m('settings.command'),
                    size: 5,
                    unique: uniquenessCheck,
                    setting: {
                        type: 'select',
                        values: commands,
                        labels,
                    },
                },
                <AppendableListSetting<HotKey>>{
                    name: 'hotkey',
                    title: $m('settings.hotkey'),
                    size: 0,
                    unique: uniquenessCheck,
                    setting: {
                        type: 'hotkey',
                    },
                },
            ],
            defaultItem: {
                command: '',
                hotkey: '',
            },
            orderable: false,
            disableable: false,
        },
    };
});
