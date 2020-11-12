import { ModuleSettingFunction } from 'typings/Module';
import { ModuleSettings, MultiSelect, Select, Text } from 'typings/Setting';

export default ((MODULE_ID: string, LSSM: Vue) => ({
    predefined_style: <Select>{
        type: 'select',
        values: ['brown', 'red', 'green', 'white', 'custom'],
        default: 'white',
    },
    custom_style: <Text>{
        type: 'text',
        default: 'invert(100%)',
        disabled: (settings: ModuleSettings) =>
            (settings[MODULE_ID]['predefined_style'] as Select).value !==
            'custom',
    },
    shown_types: <MultiSelect>{
        type: 'multiSelect',
        values: Object.values(LSSM.$t('pois')) as string[],
        default: Object.values(LSSM.$t('pois')) as string[],
        noLabelTranslation: true,
    },
})) as ModuleSettingFunction;
