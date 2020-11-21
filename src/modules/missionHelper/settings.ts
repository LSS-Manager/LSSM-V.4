import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, Select, Toggle } from 'typings/Setting';

export default ((MODULE_ID: string) => ({
    'title': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'id': <Toggle>{
        type: 'toggle',
        default: false,
    },
    'type': <Toggle>{
        type: 'toggle',
        default: false,
    },
    'place': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'prerequisites': <Toggle>{
        type: 'toggle',
        default: false,
    },
    'vehicles.title': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'vehicles.content': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'vehicles.sort': <Select>{
        type: 'select',
        values: ['caption', 'amount', 'percentage'],
        default: 'caption',
        dependsOn: '.vehicles.content',
    },
    ...(['de_DE', 'en_US', 'nl_NL'].includes(BUILD_LANG)
        ? {
              'vehicles.patient_additionals': <Toggle>{
                  type: 'toggle',
                  default: true,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'chances.normal': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'chances.100': <Toggle>{
        type: 'toggle',
        default: false,
        dependsOn: '.chances.normal',
    },
    ...(BUILD_LANG !== 'nl_NL'
        ? {
              'multifunctionals.heavy_rescue_vehicles': <Toggle>{
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'multifunctionals.battalion_chief_vehicles': <Toggle>{
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['vehicles.content'].value ||
            settings[MODULE_ID]['hide_battalion_chief_vehicles'].value,
    },
    'hide_battalion_chief_vehicles': <Toggle>{
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['vehicles.content'].value ||
            settings[MODULE_ID]['multifunctionals.battalion_chief_vehicles']
                .value,
    },
    ...(BUILD_LANG === 'nl_NL'
        ? {
              'multifunctionals.police_cars': <Toggle>{
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    ...(BUILD_LANG === 'de_DE'
        ? {
              'multifunctionals.platform_trucks': <Toggle>{
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'optionalAlternatives.allow_rw_instead_of_lf': <Toggle>{
        type: 'toggle',
        default: false,
        dependsOn: '.vehicles.content',
    },
    'optionalAlternatives.allow_arff_instead_of_lf': <Toggle>{
        type: 'toggle',
        default: false,
        dependsOn: '.vehicles.content',
    },
    ...(['de_DE', 'en_US', 'nl_NL', 'it_IT'].includes(BUILD_LANG)
        ? {
              'optionalAlternatives.allow_ktw_instead_of_rtw': <Toggle>{
                  type: 'toggle',
                  default: false,
                  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  disabled: (settings): boolean =>
                      !settings[MODULE_ID]['patients.content'].value &&
                      !settings[MODULE_ID]['vehicles.content'].value,
              },
          }
        : null),
    'patients.title': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'patients.content': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'patients.live': <Toggle>{
        type: 'toggle',
        default: true,
    },
    ...(['en_GB', 'en_US', 'it_IT'].includes(BUILD_LANG)
        ? {
              'patient.code_possible': <Toggle>{
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
    ...(BUILD_LANG !== 'nl_NL'
        ? {
              'patients.patient_allow_first_responder_chance': <Toggle>{
                  type: 'toggle',
                  default: true,
                  dependsOn: '.patients.content',
              },
          }
        : null),
    'patients.hideWhenNoNeed': <Toggle>{
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['patients.title'].value &&
            !settings[MODULE_ID]['patients.content'].value,
    },
    'prisoners.title': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'prisoners.content': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'prisoners.live': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'generatedBy': <Toggle>{
        type: 'toggle',
        default: false,
    },
    'credits': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'expansions': <Toggle>{
        type: 'toggle',
        default: true,
    },
    ...(BUILD_LANG === 'en_US'
        ? {
              subsequent: <Toggle>{
                  type: 'toggle',
                  default: true,
              },
          }
        : null),
    'followup': <Toggle>{
        type: 'toggle',
        default: true,
    },
    'overlay': <Hidden>{
        type: 'hidden',
        default: false,
    },
    'minified': <Hidden>{
        type: 'hidden',
        default: false,
    },
    ...(BUILD_LANG === 'de_DE'
        ? {
              k9_only_if_needed: <Toggle>{
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
    ...(BUILD_LANG === 'nl_NL'
        ? {
              bike_police_only_if_needed: <Toggle>{
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
})) as ModuleSettingFunction;
