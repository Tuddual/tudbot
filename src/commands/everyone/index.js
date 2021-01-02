


// help and commands are defined here to prevent require loop
const commands = {
    description: 'Command to have a list of the commands.',
    long_description: ` is a command to list all the commands you have access.`,
    use: `commands`
};
const help = {
    description: 'Command to have a description for a specific command.',
    long_description: ` is a command to have details on the <command>.`,
    use: `help <command>`
};

module.exports = {
    alias: {
        "help": help,
        "commands": commands
    },
    unique: [
        "help",
        "commands"
    ]
};
