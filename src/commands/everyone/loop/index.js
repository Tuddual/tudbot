const help = require("./help");
const commands = require("./commands");

module.exports = {
    alias: {
        "help": help,

        "command": commands,
        "commands": commands
    }
};