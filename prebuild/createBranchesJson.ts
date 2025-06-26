import { writeFile } from 'node:fs/promises';
export default async (): Promise<void> =>
    writeFile('./static/branches.json', '{}');
