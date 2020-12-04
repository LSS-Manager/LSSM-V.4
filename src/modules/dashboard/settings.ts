import { ModuleSettingFunction } from 'typings/Module';
import { Hidden } from 'typings/Setting';

export default (() => ({
    buildings_column_chart: <Hidden>{ type: 'hidden', default: false },
})) as ModuleSettingFunction;
