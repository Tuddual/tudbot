const process = require('process'); // Understand node process here : https://nodejs.org/api/process.html#process_process

process.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1);
});

try {
	var Discord = require("discord.js");
} catch (error){
	console.log(error.stack);
	console.log("Please install dependencies with 'npm install --only=prod'"); // tell to install dependencies
	process.exit();
}

const config = require("./config.json");
const data = require("./data.json");
let adminCmds = require("./adminCmds.js"); // Admin commands

const client = new Discord.Client();

client.on("message", function(message) {
    if (message.author.bot) return; // The message is from a bot
    if (!message.content.startsWith(data.prefix)) return; // The message don't concern me.

    const commandBody = message.content.slice(data.prefix.length);
    const args = commandBody.split(' ');

    if (args.length === 0) return; // There is no command
    const command = args.shift().toLowerCase();

    if (Object.keys(adminCmds).includes(command)) { // Check if this is a command for admins
        if (message.member.hasPermission('ADMINISTRATOR')) { // check if the user is an admin
            return adminCmds[command].process(message);
        } else {
            return message.channel.reply("you do not have the right to use this command.");
        }
    }
});

client.login(config.BOT_TOKEN);
