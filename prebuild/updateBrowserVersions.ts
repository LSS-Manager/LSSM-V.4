import browserslist from 'browserslist';
import fs from 'fs';

import browsers from '../src/utils/browsers.json';

export default (): void => {
    const browserVersions = browserslist('last 1 version');
    Object.keys(browsers).forEach(browser => {
        const regex = new RegExp(`(?<=^${browser} )\\d+`);
        const latest = browserVersions
            .find(b => b.match(regex))
            ?.match(regex)?.[0];
        if (latest)
            browsers[<keyof typeof browsers>browser].latest = parseInt(latest);
    });
    fs.writeFileSync(
        './src/utils/browsers.json',
        JSON.stringify(browsers, null, 4)
    );
};
