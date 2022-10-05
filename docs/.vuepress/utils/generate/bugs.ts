import fs from 'fs';

import config from '../../../../src/config';

const [, , file] = process.argv;

(async () =>
    fetch(
        `https://api.github.com/repos/${config.github.repo}/issues?labels=bug&per_page=100&sort=created`
    )
        .then(res => res.json())
        .then(bugs => fs.writeFileSync(file, JSON.stringify(bugs))))();
