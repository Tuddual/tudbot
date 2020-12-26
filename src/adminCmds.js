const Discord = require("discord.js");

let data = require("./data.json");

module.exports = {
    "wakeup": {
        description: "Use once to start and set up the bot.",
        process: (msg) => {
            const channel = msg.channel; // Channel where the message has been writeen and where we will respond
            const user = msg.member; // User that has send the message
            if (data.setup === "ongoing") {
                channel.send("There is already an admin going through the setup !");
            } else if (data.setup) {
                channel.send("The bot has already been setup !")
            } else {
                data.setup = "ongoing"; // Only one user can setup the bot

                channel.send("https://tenor.com/btkqj.gif");
                channel.send("First of all, thank you for using tudbot! :heart:");
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

                            channel.send(step);

                            data.setup = true;

                        } else {
                            channel.send("No problem chief, you can setup things later :smiley:");
                        }
                    })
                })
            }
        }
    }
}