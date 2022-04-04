import fs from 'fs';

import axios from 'axios';

import config from '../../../../src/config';

const [, , file] = process.argv;

(async () =>
    axios(
        `https://api.github.com/repos/${config.github.repo}/issues?labels=bug&per_page=100&sort=created`
    ).then(({ data: bugs }) => fs.writeFileSync(file, JSON.stringify(bugs))))();
