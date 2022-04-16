import fs from 'fs';

type LangCode = `${string}_${string}`;

const PRIMARIES: LangCode[] = ['de_DE', 'en_US', 'nl_NL'];

const [, , file, langs] = process.argv;

const langArray: [LangCode, string][] = JSON.parse(langs);

const enFlags = langArray
    .filter(([lang]) => lang.startsWith('en_'))
    .map(([, flag]) => flag)
    .join('');

const generateAction = (lang: LangCode, flag: string) => `  - text: ${flag}
    link: /${lang}/
    type: ${PRIMARIES.includes(lang) ? 'primary' : 'secondary'}`;

fs.writeFileSync(
    file,
    fs
        .readFileSync(file)
        .toString()
        .replace(
            /^---.*?---\n\n<!--.*?-->/su,
            `
---
home: true
heroImage: /img/lssm.png
actions:
${PRIMARIES.map(lang =>
    generateAction(
        lang,
        lang === 'en_US'
            ? enFlags
            : langArray.find(([locale]) => locale === lang)?.[1] ?? ''
    )
).join('\n')}
  - text: " "
    link: " "
    type: secondary
${langArray
    .filter(([lang]) => !PRIMARIES.includes(lang) && !lang.startsWith('en_'))
    .map(([lang, flag]) => generateAction(lang, flag))
    .join('\n')}
  - text: " "
    link: " "
    type: secondary
  - text: Language not listed?
    link: /en_US/faq#_1-lss-manager-does-not-support-your-game-yet
    type: secondary
---

<!-- Do NOT edit anything above this line! Any edits will be removed as content is auto generated! -->
`.trim()
        )
);
