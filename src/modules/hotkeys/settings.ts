import getCommandName from './assets/getCommandName';

import type { ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    HotKey,
    Select,
} from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID, LSSM, $m) => {
    //[NameOfHotkey in i18n.json, unique as String] (easier that way)
    const commands: string[][] = [
        ['main.chat.focus', 'false'],
        ['main.map.search.focus', 'false'],
        ['main.map.zoom.in', 'false'],
        ['main.map.zoom.out', 'false'],
        ['main.map.move.up', 'false'],
        ['main.map.move.down', 'false'],
        ['main.map.move.left', 'false'],
        ['main.map.move.right', 'false'],
        ['main.missionlist.search.focus', 'false'],
        ['main.missionlist.eclSort.open', 'false'],
        ['main.lssm.menu.toggle', 'false'],
        ['*.credits.open', 'false'],
        ['*.credits.daily', 'false'],
        ['*.credits.overview', 'false'],
        ['*.tasks.open', 'false'],
        ['*.profile.open', 'false'],
        ['*.profile.level', 'false'],
        ['*.profile.awards', 'false'],
        ['*.profile.notes', 'false'],
        ['*.alliance.open', 'false'],
        ['*.alliance.members', 'false'],
        ['*.alliance.onlineMembers', 'false'],
        ['*.alliance.buildings', 'false'],
        ['*.alliance.funds', 'false'],
        ['*.alliance.forum', 'false'],
        ['*.alliance.schoolings', 'false'],
        ['*.alliance.messages', 'false'],
        ['*.alliance.applications', 'false'],
        ['*.alliance.logfiles', 'false'],
        ['*.protocol', 'false'],
        ['mission.sorted.alert_next', 'false'],
        ['mission.sorted.prev', 'false'],
        ['mission.sorted.next', 'false'],
        ['mission.sorted.alert_share_next', 'false'],
        ['mission.alliance.focus', 'false'],
        ['mission.alliance.toggle', 'false'],
        ['mission.arr.next', 'false'],
        ['mission.arr.previous', 'false'],
        ['mission.vehicleList.next', 'false'],
        ['mission.vehicleList.previous', 'false'],
        ['mission.vehicleList.loadMissing', 'false'],
        ['mission.backalarm.allVehicles', 'false'],
        ['mission.backalarm.onlyAmbulance', 'false'],
        ['mission.backalarm.abortApproach', 'false'],
        ['building.goto.previousBuilding', 'false'],
        ['building.goto.nextBuilding', 'false'],
        ['building.goto.dispatchCenter', 'false'],
        ['building.goto.expand', 'false'],
        ['building.goto.firstVehicle', 'false'],
        ['building.goto.hire', 'false'],
        ['building.goto.personal', 'false'],
        ['building.changeSharing.enableSharing', 'false'],
        ['building.changeSharing.disableSharing', 'false'],
        ['building.changeSharing.toggleSharing', 'false'],
        ['building.dispatch.next', 'false'],
        ['building.dispatch.previous', 'false'],
        ['building.dispatch.plannedMission', 'false'],
        ['building.dispatch.protocol', 'false'],
        ['building.dispatch.stats', 'false'],
        ['building.dispatch.buildings', 'false'],
        ['building.dispatch.extensions', 'false'],
        ['building.dispatch.vehicle', 'false'],
        ['building.dispatch.schooling', 'false'],
        ['building.dispatch.patrol_vehicles', 'false'],
        ['building.dispatch.patrol', 'false'],
        ['building.dispatch.settings', 'false'],
        ['building.dispatch.openFirstPlannedMission', 'false'],
    ].sort();
    const labels: string[] = commands.map(command =>
        getCommandName(command[0], $m)
    );

    return {
        hotkeys: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'command',
                    title: $m('settings.command'),
                    size: 5,
                    unique: !!commands[1],
                    setting: {
                        type: 'select',
                        values: commands[0],
                        labels,
                    },
                },
                <AppendableListSetting<HotKey>>{
                    name: 'hotkey',
                    title: $m('settings.hotkey'),
                    size: 0,
                    unique: true,
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
