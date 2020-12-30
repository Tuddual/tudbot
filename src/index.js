// Understand node process at https://nodejs.org/api/process.html#process_process
const process = require('process');
process.on('unhandledRejection', (reason) => {
    console.error(reason);
    process.exit(1);
});

try {
    var { Client, Intents } = require("discord.js");
} catch (error) { // dependencies hasn't been installed
    console.error("Please install dependencies with 'npm install --only=prod'");
    process.exit();
}

const auth = require("../auth.json");
// if the token hasn't been change from 'YOUR BOT TOKEN'
if (!Object.prototype.hasOwnProperty.call(auth, 'BOT_TOKEN') || auth.BOT_TOKEN === 'YOUR BOT TOKEN') {
    console.error("Please enter your bot token at ./auth.json");
    process.exit()
}

let data = require("./data");

const adminCmds = require("./commands/admin"); // Admin commands
const modCmds = require("./commands/moderator"); // Moderator commands
const allCmds = require("./commands/everyone"); // Everyone commands
const commands = require("./commands/everyone/commands");
const help = require("./commands/everyone/help");

const intents = new Intents([
    Intents.NON_PRIVILEGED, // include all non-privileged intents, would be better to specify which ones you actually need
    "GUILD_MEMBERS", // lets you request guild members
]);

const bot = new Client({ ws: { intents } });

bot.on("message", (message) => {
    if (message.author.bot) return; // The message is from a bot
    if (!message.content.startsWith(data.prefix)) return; // The message don't concern me.

    const commandBody = message.content.slice(data.prefix.length);
    const args = commandBody.split(' ');

    if (args.length === 0) return; // There is no command
    const command = args.shift().toLowerCase();

    if (command === "commands") {
        return commands(message);
    } else if (command === "help"){
        return help(message, args);
    } else if (Object.keys(adminCmds.alias).includes(command)) { // Check if this is a command for admins
        if (message.member.hasPermission('ADMINISTRATOR')) { // Check if the user is an admin
            return adminCmds.alias[command].process(message, args);
        }
    } else if (Object.keys(modCmds.alias).includes(command)) { // Check if this is a command for moderators
        if (message.member.hasPermission('ADMINISTRATOR')) { // Check if the user is an admin
            return modCmds.alias[command].process(message, args);
        } else { // Check if the user is a moderator
            message.guild.members.fetch(message.member.id); // Reaload the cache
            if (message.member.roles.cache.some(r => data.moderator.includes('<@&' + r.id + '>'))) {
                return modCmds.alias[command].process(message, args)
            }
        }
    } else if (Object.keys(allCmds.alias).includes(command)) { // Check if this is a command
        return allCmds.alias[command].process(message, args)
    }
});

// Connect the bot to the server
bot.login(auth.BOT_TOKEN).catch((error) => {
    if (error.code === "TOKEN_INVALID") {
        console.error("The token of the bot is invalid, please change it at ./auth.json"); // tell to insert a valid bot token
    } else {
        console.error(error) // in case of other error (Discord is offline)
    }
    process.exit();
});
