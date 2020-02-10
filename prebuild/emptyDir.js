const fs = require('fs');

module.exports = {
    emptyFolder: path => {
        if (fs.existsSync(path)) {
            fs.readdirSync(path).forEach(file => {
                let curPath = path + '/' + file;
                if (fs.lstatSync(curPath).isDirectory()) {
                    module.exports.emptyFolder(curPath);
                } else {
                    fs.unlinkSync(curPath);
                }
            });
            fs.rmdirSync(path);
        }
    },
};
