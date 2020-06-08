import { Modules } from '../typings/Module';

const files = require.context('.', true, MODULE_REGISTER_FILES);
const modules = {} as Modules;
files.keys().forEach(key => (modules[key.split('/')[2]] = files(key)));

export default modules;
