const { MessageEmbed } = require("discord.js");
let data = require("../../data");

const timelimit = 3600000; // 1 hour

module.exports = {
    description: 'Command to reset the bot by default.',
    long_description: ` is a command to reset the bot by default.
    The server owner need to accept with a react to complete the process.`,
    use: `reset`,
    process: (msg) => {

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Reset')
            .setDescription(`Keep in mind that resetting the bot is not reversible
            The server owner need to accept with :white_check_mark:
            If this is a mistake, react with :no_entry:`);

        msg.channel.send(embed)
        .then(embed => {

            embed.react('✅')
            .then(embed.react('⛔').catch(error => console.error(error)))
            .catch(error => console.error(error));

            const filter = (reaction, user) => ['✅', '⛔'].includes(reaction.emoji.name) && msg.guild.owner.id === user.id;
            embed.awaitReactions(filter, { max: 1, time: timelimit, error: ['time'] })
            .then(collected => {

                const reaction = collected.first();

                if (reaction.emoji.name === '✅') {

                    embed.react('🆗').catch(error => console.error(error));

                    data.reset();

                } else if (reaction.emoji.name === '⛔') {

                    embed.react('🆗').catch(error => console.error(error));

                }
            }).catch(() => {
                embed.react('⏲️').catch(error => console.error(error));
            });
        }).catch((error) => {
            console.error(error);
            msg.react('😞').catch(error => console.error(error));
        });
    }
};
