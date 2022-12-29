import fs from 'fs';
import path from 'path';

import emojis from 'emoji-toolkit/emoji.json';

fs.writeFileSync(
    path.resolve(__dirname, '../../src/generated/emojis.json'),
    JSON.stringify(
        Object.fromEntries(
            Object.entries(emojis).map(
                ([
                    unicode,
                    { name, shortname, shortname_alternates, ascii },
                ]) => [
                    unicode
                        .split('-')
                        .map(n => String.fromCodePoint(parseInt(n, 16)))
                        .join(''),
                    [
                        ...new Set([
                            `:${name
                                .replace(/[ ,\-:]/gu, '_')
                                .replace(/_+/gu, '_')}:`,
                            shortname,
                            ...shortname_alternates,
                            ...ascii,
                        ]),
                    ],
                ]
            )
        )
    ),
    'utf8'
);
