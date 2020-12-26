const process = require('process'); // Understand node process here : https://nodejs.org/api/process.html#process_process

process.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1);
});

try {
    var Discord = require("discord.js");
} catch (error) {
    console.error("Please install dependencies with 'npm install --only=prod'"); // tell to install dependencies
    process.exit();
}

const config = require("./../auth.json");
if (!Object.prototype.hasOwnProperty.call(config, 'BOT_TOKEN') || config.BOT_TOKEN === 'YOUR BOT TOKEN') {
    console.error("Please enter your bot token at ./auth.json"); // tell to insert the bot token
    process.exit()
}

const data = require("./data.json");
let adminCmds = require("./adminCmds.js"); // Admin commands

const client = new Discord.Client();

client.on("message", function (message) {
    if (message.author.bot) return; // The message is from a bot
    if (!message.content.startsWith(data.prefix)) return; // The message don't concern me.

    const commandBody = message.content.slice(data.prefix.length);
    const args = commandBody.split(' ');

    if (args.length === 0) return; // There is no command
    const command = args.shift().toLowerCase();

    // Check if this is a command for admins 1 if the user is an admin
    if (Object.keys(adminCmds).includes(command) && (message.member.hasPermission('ADMINISTRATOR'))) {
        return adminCmds[command].process(message);
    }
});

client.login(config.BOT_TOKEN).catch((error) => {
    if (error.code === "TOKEN_INVALID") {
        console.error("The token of the bot is invalid, please change it at ./auth.json");
    } else {
        console.error(error)
    }
    process.exit();
});
