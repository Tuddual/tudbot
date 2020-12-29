const fs = require('fs');

class Data {
    constructor() {
        fs.open('./src/data/myserver.json', 'r', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('./src/data/myserver.json does not exist');
                } else {
                    console.error("Cannot read ./src/data/myserver.json");
                }
                throw err;
            } else {
                fs.readFile(fd, 'utf8', (err, ds) => {

                    const jsonds = JSON.parse(ds);

                    this.prefix = jsonds.prefix;
                    this.color = jsonds.color;
                    this.moderator = jsonds.moderator;
                });
            }
        });
    }

    save() {
        fs.open('./src/data/myserver.json', 'w', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('./src/data/myserver.json does not exist');
                    return;
                }
                console.error("Cannot overwrite ./src/data/myserver.json");
                throw err;
            } else {

                fs.writeFileSync(fd, JSON.stringify(this, null, 4));
            }
        });
    }
}

let data = new Data();
module.exports = data;
