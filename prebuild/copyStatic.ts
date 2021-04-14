// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import copydir from 'copy-dir';
import fs from 'fs';

import config from '../src/config';

export default (): void => {
    const staticConfigs = JSON.parse(
        fs.readFileSync('./static/.configs.json').toString()
    );

    staticConfigs.acao = `^https://(?:www.)?(?:${Object.values(config.games)
        .map(g => (g.police ? `(${g.police}.)?${g.shortURL}` : g.shortURL))
        .join('|')})$`;
    staticConfigs.admins = config.admins;

    fs.writeFileSync(
        './static/.configs.json',
        JSON.stringify(staticConfigs, null, 4)
    );

    if (!fs.existsSync('./dist')) fs.mkdirSync('./dist');

    copydir.sync('./static', `./dist/static`);
    if (fs.existsSync(`./admin`)) copydir.sync('./admin', './dist/admin');
    fs.copyFileSync('./.htaccess', './dist/.htaccess');
};
