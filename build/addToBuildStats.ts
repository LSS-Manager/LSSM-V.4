import fs from 'fs';
import path from 'path';

const ROOT_PATH = path.join(__dirname, '../');
const FILE_PATH = path.join(ROOT_PATH, 'dist/static/build_stats.json');

export default (add: Record<string, unknown>): void =>
    fs.writeFileSync(
        FILE_PATH,
        JSON.stringify({
            ...JSON.parse(
                fs.existsSync(FILE_PATH)
                    ? fs.readFileSync(FILE_PATH).toString() ?? '{}'
                    : '{}'
            ),
            ...add,
        })
    );
