const { MessageEmbed } = require("discord.js");
let data = require("../../data");

const timelimit = 3600000; // 1 hour

module.exports = {
    description: 'Command to edit the color',
    use: `${data.color}setcolor`,
    process: (msg) => {

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Color')
            .setDescription(`The current color is set on \`${data.color}\`
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

                    msg.channel.send(`Please enter in chat the new color. \n The color need to be codded in hexadecimal like this \`${data.color}\`. \n You can choose it here : htmlcolorcodes.com`)
                    .then(rules => {

                        const hex = /#[0-9A-Fa-f]{6}|[0-9A-Fa-f]{6}/g
                        const filter2 = m => hex.test(m.content) && m.content && m.author.id === msg.author.id;
                        msg.channel.awaitMessages(filter2, { max: 1, time: timelimit, error: ['time'] }).then(collected => {

                            let newcolor = collected.first().content;
                            if (newcolor.length == 6) {
                                newcolor = "#" + newcolor
                            }

                            data.color = newcolor;
                            data.save();

                            msg.channel.send(`The color has been correctly set on \`${newcolor}\``);
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
