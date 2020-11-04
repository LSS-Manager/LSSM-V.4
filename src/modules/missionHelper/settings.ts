export default (MODULE_ID: string): unknown => ({
    'title': {
        type: 'toggle',
        default: true,
    },
    'id': {
        type: 'toggle',
        default: false,
    },
    'type': {
        type: 'toggle',
        default: false,
    },
    'place': {
        type: 'toggle',
        default: true,
    },
    'prerequisites': {
        type: 'toggle',
        default: false,
    },
    'vehicles.title': {
        type: 'toggle',
        default: true,
    },
    'vehicles.content': {
        type: 'toggle',
        default: true,
    },
    'vehicles.sort': {
        type: 'select',
        values: ['caption', 'amount', 'percentage'],
        default: 'caption',
        dependsOn: '.vehicles.content',
    },
    ...(['de_DE', 'en_US', 'nl_NL'].includes(BUILD_LANG)
        ? {
              'vehicles.patient_additionals': {
                  type: 'toggle',
                  default: true,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'chances.normal': {
        type: 'toggle',
        default: true,
    },
    'chances.100': {
        type: 'toggle',
        default: false,
        dependsOn: '.chances.normal',
    },
    ...(BUILD_LANG !== 'nl_NL'
        ? {
              'multifunctionals.heavy_rescue_vehicles': {
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'multifunctionals.battalion_chief_vehicles': {
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['vehicles.content'].value ||
            settings[MODULE_ID]['hide_battalion_chief_vehicles'].value,
    },
    'hide_battalion_chief_vehicles': {
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
              'multifunctionals.police_cars': {
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    ...(BUILD_LANG === 'de_DE'
        ? {
              'multifunctionals.platform_trucks': {
                  type: 'toggle',
                  default: false,
                  dependsOn: '.vehicles.content',
              },
          }
        : null),
    'optionalAlternatives.allow_rw_instead_of_lf': {
        type: 'toggle',
        default: false,
        dependsOn: '.vehicles.content',
    },
    'optionalAlternatives.allow_arff_instead_of_lf': {
        type: 'toggle',
        default: false,
        dependsOn: '.vehicles.content',
    },
    'optionalAlternatives.allow_ktw_instead_of_rtw': {
        type: 'toggle',
        default: true,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['patients.content'].value &&
            !settings[MODULE_ID]['vehicles.content'].value,
    },
    'patients.title': {
        type: 'toggle',
        default: true,
    },
    'patients.content': {
        type: 'toggle',
        default: true,
    },
    'patients.live': {
        type: 'toggle',
        default: true,
    },
    ...(['en_GB', 'en_US', 'it_IT'].includes(BUILD_LANG)
        ? {
              'patient.code_possible': {
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
    ...(BUILD_LANG !== 'nl_NL'
        ? {
              'patients.patient_allow_first_responder_chance': {
                  type: 'toggle',
                  default: true,
                  dependsOn: '.patients.content',
              },
          }
        : null),
    'patients.hideWhenNoNeed': {
        type: 'toggle',
        default: false,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        disabled: (settings): boolean =>
            !settings[MODULE_ID]['patients.title'].value &&
            !settings[MODULE_ID]['patients.content'].value,
    },
    'prisoners.title': {
        type: 'toggle',
        default: true,
    },
    'prisoners.content': {
        type: 'toggle',
        default: true,
    },
    'prisoners.live': {
        type: 'toggle',
        default: true,
    },
    'generatedBy': {
        type: 'toggle',
        default: false,
    },
    'credits': {
        type: 'toggle',
        default: true,
    },
    'expansions': {
        type: 'toggle',
        default: true,
    },
    'followup': {
        type: 'toggle',
        default: true,
    },
    'overlay': {
        type: 'hidden',
        default: false,
    },
    'minified': {
        type: 'hidden',
        default: false,
    },
    ...(BUILD_LANG === 'de_DE'
        ? {
              k9_only_if_needed: {
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
    ...(BUILD_LANG === 'nl_NL'
        ? {
              bike_police_only_if_needed: {
                  type: 'toggle',
                  default: false,
              },
          }
        : null),
});
