const fs = require('fs');

module.exports = {
    emptyFolder: (path, deleteFolder = true) => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(file => {
                let curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    module.exports.emptyFolder(curPath, true);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            if (deleteFolder) fs.rmdirSync(path);
        }
    },
};
