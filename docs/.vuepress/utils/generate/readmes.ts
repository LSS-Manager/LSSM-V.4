import fs from 'fs';
import path from 'path';

import config from '../../../../src/config';
import addCommonLinks, { type CommonLinksConfig } from '../addCommonLinks';

type LangCode = `${string}_${string}`;

const [, , DOCS_PATH, langs] = process.argv;

const LANGS: [LangCode, { lssm: string; game: string }][] = JSON.parse(langs);

const commonLinksConfig: CommonLinksConfig = [
    'lssm',
    'tampermonkey',
    'games.self',
    'docs',
    'github',
];

LANGS.forEach(([lang, serverStatus]) => {
    const localePath = path.join(DOCS_PATH, lang);
    if (!fs.existsSync(localePath)) return;
    const filePath = path.join(localePath, 'README.md');
    const flag = config.games[lang].flag;
    fs.writeFileSync(
        filePath,
        addCommonLinks(
            (fs.readFileSync(filePath).toString() ?? '').replace(
                /(.|\n)*?(?=\n## )/u,
                `---
title: LSS-Manager V.4
lang: ${lang.replace(/_/u, '-')}
sidebarDepth: 2
---

# Wiki ${flag} <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: *{{ $theme.variables.versions.stable }}* [![Online Status for stable](https://status.lss-manager.de/api/badge/71/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]
> 
> beta: *{{ $theme.variables.versions.beta }}* [![Online Status for beta](https://status.lss-manager.de/api/badge/72/status?style=flat&upLabel=online&downLabel=offline)][lssm.status]

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[${serverStatus.lssm}][lssm.status]

[${serverStatus.game}](https://status.lss-manager.de/status/missionchief)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->
`
            ),
            commonLinksConfig,
            lang
        )
    );

    fs.readdirSync(localePath).forEach(fileName => {
        if (fileName === 'README.md' || !fileName.endsWith('.md')) return;
        const filePath = path.join(localePath, fileName);
        fs.writeFileSync(
            filePath,
            addCommonLinks(
                fs
                    .readFileSync(filePath)
                    .toString()
                    .replace(
                        /(?<=^-+\n(?:.*\n)*?)lang:.*(?=\n(?:.*\n)*?-+\n)/u,
                        `lang: ${lang}`
                    ),
                commonLinksConfig,
                lang
            )
        );
    });
});
