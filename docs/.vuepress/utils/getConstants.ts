import fs from 'fs';
import path from 'path';

import config from '../../../src/config';

import type { Locale } from '../types/Locale';

const DOCS_URL = new URL(config.docs);
const BASE = DOCS_URL.pathname as '/' | `/${string}/`;

const VUEPRESS_PATH = path.join(__dirname, '../');
const ROOT_PATH = path.join(VUEPRESS_PATH, '../../');
const MODULES_PATH = path.join(ROOT_PATH, 'src/modules');
const DIST_PATH = path.join(ROOT_PATH, 'dist');
const DOCS_PATH = path.join(ROOT_PATH, 'docs');
const DOCS_DIST_PATH = path.join(VUEPRESS_PATH, 'dist');
const DOCS_TEMP_PATH = path.join(VUEPRESS_PATH, '.temp');
const DOCS_I18N_PATH = path.join(VUEPRESS_PATH, 'i18n');
const DOCS_UTILS_PATH = path.join(VUEPRESS_PATH, 'utils');
const DOCS_COMPONENTS_PATH = path.join(VUEPRESS_PATH, 'components');

const LANGS = Object.keys(config.games)
    .filter(lang => fs.existsSync(path.join(DOCS_PATH, lang)))
    .sort() as Locale[];
const MODULES = fs
    .readdirSync(MODULES_PATH)
    .filter(
        module =>
            !['template', ...config.modules['core-modules']].includes(module)
    );

export default () => ({
    DOCS_URL,
    BASE,
    VUEPRESS_PATH,
    ROOT_PATH,
    MODULES_PATH,
    DIST_PATH,
    DOCS_PATH,
    DOCS_DIST_PATH,
    DOCS_TEMP_PATH,
    DOCS_I18N_PATH,
    DOCS_UTILS_PATH,
    DOCS_COMPONENTS_PATH,
    LANGS,
    MODULES,
});
