import type { Hidden } from 'typings/Setting';
import type { ModuleSettingFunction } from 'typings/Module';

export default (() => ({
    hide_ownschooling: <Hidden>{ type: 'hidden', default: false },
    hide_openschooling: <Hidden>{ type: 'hidden', default: false },
})) as ModuleSettingFunction;
