import fs from 'fs';
import path from 'path';

import config from '../../../../src/config';

type LangCode = `${string}_${string}`;

const [, , DOCS_PATH, langs] = process.argv;

const LANGS: [LangCode, string][] = JSON.parse(langs);

LANGS.forEach(([lang, serverStatus]) => {
    const localePath = path.join(DOCS_PATH, lang);
    if (!fs.existsSync(localePath)) return;
    const filePath = path.join(localePath, 'README.md');
    const flag = config.games[lang].flag;
    fs.writeFileSync(
        filePath,
        (fs.readFileSync(filePath).toString() ?? '').replace(
            /(.|\n)*?(?=\n## )/u,
            `---
title: LSS-Manager V.4
lang: ${lang.replace(/_/u, '-')}
sidebarDepth: 2
---

# Wiki ${flag} <Badge :text="'v' + $theme.variables.versions.short"/>

> stable: <i>{{ $theme.variables.versions.stable }}</i>
> 
> beta: <i>{{ $theme.variables.versions.beta }}</i>

<discord style="float: right;"><img src="https://discord.com/api/guilds/254167535446917120/embed.png?style=banner1" alt="Our Discord-Server: United Dispatch" data-prevent-zooming></discord>

[${serverStatus}](https://stats.uptimerobot.com/OEKDJSpmvK)

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->
`
        )
    );

    fs.readdirSync(localePath).forEach(fileName => {
        if (fileName === 'README.md' || !fileName.endsWith('.md')) return;
        const filePath = path.join(localePath, fileName);
        fs.writeFileSync(
            filePath,
            fs
                .readFileSync(filePath)
                .toString()
                .replace(
                    /(?<=^-+\n(?:.*\n)*?)lang:.*(?=\n(?:.*\n)*?-+\n)/u,
                    `lang: ${lang}`
                )
        );
    });
});
