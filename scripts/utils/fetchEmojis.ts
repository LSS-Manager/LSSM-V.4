import fs from 'fs';
import path from 'path';

import emojis from 'emoji-toolkit/emoji.json';

fs.writeFileSync(
    path.resolve(__dirname, '../../src/generated/emojis.json'),
    JSON.stringify(
        Object.fromEntries(
            Object.entries(emojis).map(
                ([
                    ,
                    {
                        name,
                        shortname,
                        shortname_alternates,
                        ascii,
                        code_points: { fully_qualified: unicode },
                    },
                ]) => [
                    unicode
                        .split('-')
                        .map(point => String.fromCodePoint(parseInt(point, 16)))
                        .reduce((a, b) => a + b),
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
