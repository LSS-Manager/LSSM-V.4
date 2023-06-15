import moment from 'moment-timezone';

import type { ModuleSettingFunction } from 'typings/Module';
import type { Select, Text, Toggle } from 'typings/Setting';

export default ((_, __, $m) => ({
    displayNav: <Toggle>{
        type: 'toggle',
        default: true,
    },
    navFormat: <Text>{
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayNav',
    },
    displayOverlay: <Toggle>{
        type: 'toggle',
        default: false,
    },
    overlayFormat: <Text>{
        type: 'text',
        default: 'LTS',
        dependsOn: '.displayOverlay',
    },
    timeZone: <Select>{
        type: 'select',
        values: ['', ...moment.tz.names()],
        labels: [`[${$m('localTime')}]`, ...moment.tz.names()],
        default: '',
    },
})) as ModuleSettingFunction;
