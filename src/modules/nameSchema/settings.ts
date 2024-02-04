import type Vue from 'vue';

import type { $m, ModuleSettingFunction } from 'typings/Module';
import type {
    AppendableList,
    AppendableListSetting,
    MultiSelect,
    RegisterSettings,
    Select,
    Text,
    Textarea,
} from 'typings/Setting';

const settings: ModuleSettingFunction = async (
    MODULE_ID: string,
    LSSM: Vue,
    $m: $m
) => {
    const buildingTypes = Object.entries(LSSM.$stores.translations.buildings)
        .map(([id, type]) => {
            const copy = Object.freeze({ ...type });
            return { id, label: copy.caption };
        })
        .toSorted((a, b) => a.label.localeCompare(b.label));
    const unitTypes = Object.entries(LSSM.$stores.translations.vehicles)
        .map(([id, type]) => {
            const copy = Object.freeze({ ...type });
            return { id, label: copy.caption };
        })
        .toSorted((a, b) => a.label.localeCompare(b.label));

    const uniqueField =
        (field: string) =>
        (
            row: Record<string, string>,
            rowIndex: number,
            settings: Record<string, string>[]
        ) => {
            if (!row[field]) return false;

            const sameType = settings
                .filter((_, i) => i !== rowIndex)
                .filter(value => value[field] === row[field]);

            return sameType.length === 0 ? false : $m('unique').toString();
        };

    const settings: RegisterSettings = {
        defaultBuildingTemplate: <Textarea>{
            type: 'textarea',
            default: $m('settings.defaultBuildingTemplate.defaultValue'),
        },
        excludeBuildings: <Omit<MultiSelect, 'isDisabled' | 'value'>>{
            type: 'multiSelect',
            labels: buildingTypes.map(u => u.label),
            values: buildingTypes.map(u => u.id),
            default: [],
        },
        defaultUnitTemplate: <Textarea>{
            type: 'textarea',
            default: $m('settings.defaultUnitTemplate.defaultValue'),
        },
        excludeUnits: <Omit<MultiSelect, 'isDisabled' | 'value'>>{
            type: 'multiSelect',
            labels: unitTypes.map(u => u.label),
            values: unitTypes.map(u => u.id),
            default: [],
        },
        buildingTemplates: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'type',
                    title: $m('settings.buildingTemplates.type'),
                    size: 2,
                    setting: {
                        type: 'select',
                        labels: buildingTypes.map(
                            buildingType => buildingType.label
                        ),
                        values: buildingTypes.map(
                            buildingType => buildingType.id
                        ),
                    },
                    unique: uniqueField('type'),
                },
                <AppendableListSetting<Text>>{
                    name: 'template',
                    title: $m('settings.buildingTemplates.template'),
                    size: 6,
                    setting: {
                        type: 'text',
                    },
                },
            ],
            defaultItem: {
                type: '',
                template: '',
            },
            orderable: false,
            disableable: true,
        },
        buildingAliases: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'type',
                    title: $m('settings.buildingAliases.type'),
                    size: 2,
                    setting: {
                        type: 'select',
                        labels: buildingTypes.map(
                            buildingType => buildingType.label
                        ),
                        values: buildingTypes.map(
                            buildingType => buildingType.id
                        ),
                    },
                    unique: uniqueField('type'),
                },
                <AppendableListSetting<Text>>{
                    name: 'alias',
                    title: $m('settings.buildingAliases.alias'),
                    size: 4,
                    setting: {
                        type: 'text',
                    },
                },
            ],
            defaultItem: {
                type: '',
                alias: '',
            },
            orderable: false,
            disableable: true,
        },
        unitTemplates: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'type',
                    title: $m('settings.unitTemplates.type'),
                    size: 2,
                    setting: {
                        type: 'select',
                        labels: unitTypes.map(unitType => unitType.label),
                        values: unitTypes.map(unitType => unitType.id),
                    },
                    unique: uniqueField('type'),
                },
                <AppendableListSetting<Text>>{
                    name: 'template',
                    title: $m('settings.unitTemplates.template'),
                    size: 6,
                    setting: {
                        type: 'text',
                    },
                },
            ],
            defaultItem: {
                type: '',
                template: '',
            },
            orderable: false,
            disableable: true,
        },
        unitAliases: <Omit<AppendableList, 'isDisabled' | 'value'>>{
            type: 'appendable-list',
            default: [],
            listItem: [
                <AppendableListSetting<Select>>{
                    name: 'type',
                    title: $m('settings.unitAliases.type'),
                    size: 2,
                    setting: {
                        type: 'select',
                        labels: unitTypes.map(unitType => unitType.label),
                        values: unitTypes.map(unitType => unitType.id),
                    },
                    unique: uniqueField('type'),
                },
                <AppendableListSetting<Text>>{
                    name: 'alias',
                    title: $m('settings.unitAliases.alias'),
                    size: 4,
                    setting: {
                        type: 'text',
                    },
                },
            ],
            defaultItem: {
                type: '',
                alias: '',
            },
            orderable: false,
            disableable: true,
        },
    };

    return settings;
};

export default settings;
