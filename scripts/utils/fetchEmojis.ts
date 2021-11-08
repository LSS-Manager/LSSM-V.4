import fs from 'fs';
import https from 'https';
import path from 'path';

declare interface EmojiData {
    name: string;
    unicode_version: number;
    category: string;
    order: number;
    display: number;
    shortname: string;
    shortname_alternates: string[];
    ascii: string[];
    humanform: number;
    diversity_base: number;
    diversity?: unknown;
    diversity_children: unknown[];
    gender: unknown[];
    gender_children: unknown[];
    code_points: {
        base: string;
        fully_qualified: string;
        decimal: string;
        diversity_parent?: unknown;
        gender_parent?: unknown;
    };
    keywords: string[];
}

const rel = (pathName: string) => path.resolve(__dirname, pathName);

const writeFile = (emojis: { [unicode: string]: string[] }) => {
    fs.writeFileSync(
        rel('../../src/utils/emojis.json'),
        JSON.stringify(emojis),
        'utf8'
    );
};

https.get(
    'https://raw.githubusercontent.com/joypixels/emoji-toolkit/master/emoji.json',
    res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            const emojis = JSON.parse(data) as {
                [unicode: string]: EmojiData;
            };

            writeFile(
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
                                        .replace(/[: ,-]/g, '_')
                                        .replace(/_+/g, '_')}:`,
                                    shortname,
                                    ...shortname_alternates,
                                    ...ascii,
                                ]),
                            ],
                        ]
                    )
                )
            );
        });
    }
);
