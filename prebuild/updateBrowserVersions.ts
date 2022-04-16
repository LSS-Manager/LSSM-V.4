import fs from 'fs';
import path from 'path';

import browserslist from 'browserslist';

const filePath = path.join(__dirname, '../src/utils/browsers.json');

export default (): void => {
    const browsers: Record<
        string,
        { download: string; latest: number; supported: number }
    > = JSON.parse(fs.readFileSync(filePath).toString());
    Object.keys(browsers).forEach(browser => {
        const versions = browserslist(`last 7 ${browser} major versions`).map(
            version =>
                parseInt(version.replace(new RegExp(`^${browser}`), '').trim())
        );
        browsers[browser].latest = Math.max(...versions);
        browsers[browser].supported = Math.min(...versions);
    });
    fs.writeFileSync(filePath, JSON.stringify(browsers, null, 4));
};
