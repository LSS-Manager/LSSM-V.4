import fs from 'fs';

/**
 * @file This file exports a function to empty a specific folder.
 */

/**
 * This method allows to empty a folder and even delete it if desired.
 * All existing symlinks in the folder will also be unlinked.
 * @param path - The path to the folder. Preferably an absolute path.
 * @param deleteFolder - Whether to delete the folder.
 */
export function emptyFolder(path: string, deleteFolder = true): void {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(file => {
            const curPath = `${path}/${file}`;
            if (fs.lstatSync(curPath).isDirectory())
                module.exports.emptyFolder(curPath, true);
            else fs.unlinkSync(curPath);
        });
        if (deleteFolder) fs.rmdirSync(path);
    }
}
