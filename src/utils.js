// The two next lines can't failed because they have been already executed in index.js
const process = require('process');
const fs = require('fs');

module.exports = {
    saveChange: () => {
        fs.open('./src/data/myserver.json', 'w', (err, fd) => {
            if (err) {
                if (err.code === 'ENOENT') {
                    console.error('./src/data/myserver.json does not exist');
                    return;
                }
                console.error("Cannot overwrite ./src/data/myserver.json");
                throw err;
            } else {
                const data = {
                    prefix: process.env.prefix,
                    color: process.env.color
                }
                fs.writeFileSync(fd, JSON.stringify(data, null, 4));
            }
        });
    }
}