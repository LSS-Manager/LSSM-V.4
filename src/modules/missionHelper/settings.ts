import { ModuleSettingFunction } from 'typings/Module';
import { Hidden, MultiSelect, Select, Toggle } from 'typings/Setting';

export default ((MODULE_ID, LSSM, $m) => {
    const noVehicleRequirements = [] as string[];
    const noVehicleRequirementLabels = [] as string[];
    Object.entries(
        ($m('noVehicleRequirements') as unknown) as {
            [key: string]: { badge: boolean; text: string };
        }
    ).forEach(([key, { text }]) => {
        noVehicleRequirements.push(key);
        noVehicleRequirementLabels.push(text);
    });
    const locale = LSSM.$store.state.lang;
    return {
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
        'vehicles.sortDesc': <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.vehicles.content',
        },
        ...(['de_DE', 'en_US', 'nl_NL'].includes(locale)
            ? {
                  'vehicles.patient_additionals': <Toggle>{
                      type: 'toggle',
                      default: true,
                      dependsOn: '.vehicles.content',
                  },
              }
            : null),
        'vehicles.xAfterNumber': <Toggle>{
            type: 'toggle',
            default: false,
        },
        'chances.normal': <Toggle>{
            type: 'toggle',
            default: true,
        },
        'chances.100': <Toggle>{
            type: 'toggle',
            default: false,
            dependsOn: '.chances.normal',
        },
        ...(locale !== 'nl_NL'
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
        ...(locale === 'nl_NL'
            ? {
                  'multifunctionals.police_cars': <Toggle>{
                      type: 'toggle',
                      default: false,
                      dependsOn: '.vehicles.content',
                  },
              }
            : null),
        ...(locale === 'de_DE'
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
        ...(locale === 'en_US'
            ? {
                  'optionalAlternatives.allow_drone_instead_of_investigation': <
                      Toggle
                  >{
                      type: 'toggle',
                      default: false,
                      dependsOn: '.vehicles.content',
                  },
              }
            : null),
        ...(['de_DE', 'en_US', 'nl_NL', 'it_IT'].includes(locale)
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
        ...(['en_GB', 'en_US', 'it_IT'].includes(locale)
            ? {
                  'patient.code_possible': <Toggle>{
                      type: 'toggle',
                      default: false,
                  },
              }
            : null),
        ...(locale !== 'nl_NL'
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
        'noVehicleRequirements': <MultiSelect>{
            type: 'multiSelect',
            default: noVehicleRequirements,
            labels: noVehicleRequirementLabels,
            values: noVehicleRequirements,
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
        ...(locale === 'en_US'
            ? {
                  subsequent: <Toggle>{
                      type: 'toggle',
                      default: true,
                  },
              }
            : null),
        ...(locale !== 'nl_NL'
            ? {
                  followup: <Toggle>{
                      type: 'toggle',
                      default: true,
                  },
              }
            : null),
        'overlay': <Hidden>{
            type: 'hidden',
            default: false,
        },
        'minified': <Hidden>{
            type: 'hidden',
            default: false,
        },
        ...(locale === 'de_DE'
            ? {
                  k9_only_if_needed: <Toggle>{
                      type: 'toggle',
                      default: false,
                  },
              }
            : null),
        ...(locale === 'de_DE'
            ? {
                  bucket_only_if_needed: <Toggle>{
                      type: 'toggle',
                      default: false,
                  },
              }
            : null),
        ...(locale === 'nl_NL'
            ? {
                  bike_police_only_if_needed: <Toggle>{
                      type: 'toggle',
                      default: false,
                  },
              }
            : null),
    };
}) as ModuleSettingFunction;
