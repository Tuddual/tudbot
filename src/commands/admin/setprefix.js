const { MessageEmbed } = require("discord.js");
let data = require("../../data");

const timelimit = 3600000; // 1 hour

module.exports = {
    description: 'Command to edit the prefix',
    use: `setprefix`,
    process: (msg) => {

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Prefix')
            .setDescription(`The current prefix is set on \`${data.prefix}\`
            - If you want to change it, react with :gear:
            - If you do not want to change it, react with :white_check_mark:`);

        msg.channel.send(embed)
        .then(embed => {

            embed.react('⚙️')
            .then(embed.react('✅').catch(error => console.error(error)))
            .catch(error => console.error(error));

            const filter = (reaction, user) => ['⚙️', '✅'].includes(reaction.emoji.name) && user.id === msg.author.id;
            embed.awaitReactions(filter, { max: 1, time: timelimit, error: ['time'] })
            .then(collected => {

                const reaction = collected.first();

                if (reaction.emoji.name === '⚙️') {

                    msg.channel.send('Please enter in chat the new prefix. \n - rule 1 : space in the prefix are not allowed \n - rule 2 : the prefix cannot be a file (image...) \n - rule 3 : except rule 1 & 2, the prefix can be anything')
                    .then(rules => {

                        const filter2 = m => m.content.length != 0 && m.author.id === msg.author.id;
                        msg.channel.awaitMessages(filter2, { max: 1, time: timelimit, error: ['time'] }).then(collected => {

                            const newprefix = collected.first().content.split(' ')[0];

                            data.prefix = newprefix;
                            data.savedata();

                            msg.channel.send(`The prefix has been correctly set on \`${newprefix}\``);
                        }).catch(() => {
                            rules.react('⏲️').catch(error => console.error(error));
                        });
                    });
                } else {
                    embed.react('🆗').catch(error => console.error(error));
                }
            }).catch(() => {
                embed.react('⏲️').catch(error => console.error(error));
            });
        });
    }
};
