import fs from 'fs';

export function emptyFolder(path: string, deleteFolder = true): void {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = path + '/' + file;
            if (fs.lstatSync(curPath).isDirectory())
                module.exports.emptyFolder(curPath, true);
            else fs.unlinkSync(curPath);
        });
        if (deleteFolder) fs.rmdirSync(path);
    }
}
