// The two next lines can't failed because they have been already executed in index.js
// const Discord = require("discord.js");
var data = require("../../data");

module.exports = {
    description: "Command to edit the prefix",
    use: `${data.prefix}setprefix`,
    process: (msg, args) => {
        msg.channel.send(args[0])
    }
}