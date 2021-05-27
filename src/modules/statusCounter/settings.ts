import { ModuleSettingFunction } from 'typings/Module';
import { NumberInput, Toggle } from 'typings/Setting';

export default <ModuleSettingFunction>((MODULE_ID: string, LSSM: Vue) => ({
    percentRounding: <NumberInput>{
        type: 'number',
        default: 2,
        min: 0,
        disabled: settings =>
            !Object.entries(settings[MODULE_ID]).find(
                ([key, { value }]) => key.startsWith('percent_') && value
            ),
    },
    ...Object.fromEntries(
        Object.entries(
            (LSSM.$t('fmsReal2Show') as unknown) as Record<string, number>
        ).flatMap(([, status]) => [
            [
                `show_${status}`,
                <Toggle>{
                    type: 'toggle',
                    default: true,
                },
            ],
            [
                `hide_${status}`,
                <Toggle>{
                    type: 'toggle',
                    default: false,
                    dependsOn: `.show_${status}`,
                },
            ],
            [
                `percent_${status}`,
                <Toggle>{
                    type: 'toggle',
                    default: false,
                    dependsOn: `.show_${status}`,
                },
            ],
        ])
    ),
    s5noblink: <Toggle>{
        type: 'toggle',
        default: false,
        disabled: settings =>
            !settings[MODULE_ID].show_5.value ||
            settings[MODULE_ID].s5blinkOnGt0.value,
    },
    s5blinkOnGt0: <Toggle>{
        type: 'toggle',
        default: true,
        disabled: settings =>
            !settings[MODULE_ID].show_5.value ||
            settings[MODULE_ID].s5noblink.value,
    },
}));
