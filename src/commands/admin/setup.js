// The two next lines can't failed because they have been already executed in index.js
const Discord = require("discord.js");
var data = require("../../data/myserver.json");

module.exports = {
    description: "Command fully to setup the bot",
    use: `${data.prefix}setup`,
    process: (msg) => {
        if (data.setup === "ongoing") {
            msg.channel.send("There is already an admin going through the setup !");
        } else if (data.setup) {
            msg.channel.send("The bot has already been setup !")
        } else {
            data.setup = "ongoing"; // Only one user can setup the bot

            msg.channel.send("https://tenor.com/btkqj.gif");
            msg.channel.send("First of all, thank you for using tudbot! :heart:");
            msg.reply("we need to set up few things before starting ! \nWhen you are ready to setup few things react with :white_check_mark: \nIf you want to use the default settings react with :fast_forward:").then(sentmsg => {

                sentmsg.react('✅').then(sentmsg.react('⏩'));
                const filter = (reaction, user) => {
                    return ['✅', '⏩'].includes(reaction.emoji.name) && user.id === msg.author.id;
                };

                sentmsg.awaitReactions(filter, { max: 1, time: 24 * 60 * 60 * 1000, error: ['time'] }).then(collected => {

                    const reaction = collected.first();

                    if (reaction.emoji.name === '✅') {
                        let step = new Discord.MessageEmbed()
                            .setColor(data.color)
                            .setTitle('Step 1/?')
                            .setDescription(':white_square_button: 1. Set the prefix. \n:white_square_button: 2. Set who has access to admins roles.');

                        msg.channel.send(step);

                        data.setup = true;

                    } else {
                        msg.channel.send("No problem chief, you can setup things later :smiley:");
                    }
                })
            })
        }
    }
};
