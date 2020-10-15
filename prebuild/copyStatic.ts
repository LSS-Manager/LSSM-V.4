// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import copydir from 'copy-dir';
import config from '../src/config';
import staticConfigs from '../static/.configs.json';
import fs from 'fs';

export default (): void => {
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
