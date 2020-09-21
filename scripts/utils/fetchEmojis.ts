import fs from 'fs';
import path from 'path';
import https from 'https';

const LATEST_VERSION = '13.1';

declare interface Emoji {
    name: string;
    char: string;
}

const parseLine = (line: string): Emoji | null => {
    const data = line.trim().split(/\s+[;#] /);

    if (data.length !== 3) return null;
    const match = data[2].match(/^(\S+) E\d+\.\d+ (.+)$/);
    if (match?.length !== 3) return null;

    return {
        name: `:${match[2].replace(/[: -]/g, '_').replace(/_+/g, '_')}:`,
        char: match[1],
    };
};

const rel = (pathName: string) => path.resolve(__dirname, pathName);

const writeFile = (emojis: { [name: string]: Emoji['char'] }) => {
    fs.writeFileSync(
        rel('../../src/utils/emojis.json'),
        JSON.stringify(emojis),
        'utf8'
    );
};

export default (): void => {
    https.get(
        `https://unicode.org/Public/emoji/${LATEST_VERSION}/emoji-test.txt`,
        res => {
            let text = '';
            res.setEncoding('utf8');
            res.on('data', chunk => {
                text += chunk;
            });
            res.on('end', () => {
                const collected = text
                    .trim()
                    .split('\n')
                    .reduce((accu, line) => {
                        if (
                            !line.startsWith('# group: ') &&
                            !line.startsWith('# subgroup: ') &&
                            !line.startsWith('#') &&
                            !line.includes('unqualified')
                        ) {
                            const meta = parseLine(line);
                            if (meta) {
                                accu[meta.name] = meta.char;
                            }
                        }
                        return accu;
                    }, {} as { [name: string]: Emoji['char'] });
                writeFile(collected);
            });
        }
    );
};
