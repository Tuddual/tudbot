


// help and commands are defined here to prevent require loop
let data = require("../../data");

const commands = {
    description: 'Command to have a list of the commands',
    use: `${data.prefix}commands`
};
const help = {
    description: 'Command to have a description for a specific command.',
    use: `${data.prefix}help <command>`
};

module.exports = {
    alias: {
        "help": help,

        "commands": commands,
        "command": commands
    },
    unique: [
        "help",
        "commands"
    ]
};
