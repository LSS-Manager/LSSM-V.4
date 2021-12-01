import { Hidden } from 'typings/Setting';
import { ModuleSettingFunction } from 'typings/Module';

export default (() => ({
    buildings_column_chart: <Hidden>{ type: 'hidden', default: false },
})) as ModuleSettingFunction;
