


// help and commands are defined here to prevent require loop
const commands = {
    description: 'Command to have a list of the commands',
    use: `commands`
};
const help = {
    description: 'Command to have a description for a specific command.',
    use: `help <command>`
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
