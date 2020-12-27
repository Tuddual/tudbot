// The three next lines can't failed because they have been already executed in index.js
const process = require('process');
const Discord = require("discord.js");
const fs = require('fs');

const timelimit = 360000; // 1 hour

module.exports = {
    description: 'Command to edit the prefix',
    use: `${process.env.prefix}setprefix`,
    process: (msg) => {

        const embed = new Discord.MessageEmbed()
            .setColor(process.env.color)
            .setTitle('Prefix')
            .setDescription(`The current prefix is set on \`${process.env.prefix}\`
            - If you want to change it, react with :gear:
            - If you do not want to change it, react with :white_check_mark:`);

        msg.channel.send(embed)
        .then(embed => {

            embed.react('⚙️').then(embed.react('✅'))

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

                            process.env.prefix = newprefix;

                            fs.open('./src/data/myserver.json', 'w', (err, fd) => {
                                if (err) {
                                    if (err.code === 'ENOENT') {
                                        console.error('./src/data/myserver.json does not exist');
                                        return;
                                    }
                                    console.error("Cannot overwrite ./src/data/myserver.json");
                                    throw err;
                                } else {
                                    const data = {
                                        prefix: process.env.prefix,
                                        color: process.env.color
                                    }
                                    fs.writeFileSync(fd, JSON.stringify(data, null, 4));
                                }
                            });

                            msg.channel.send(`The prefix has been correctly set on \`${newprefix}\``);
                        }).catch(() => {
                            rules.react('⏲️');
                        });
                    });
                } else {
                    embed.react('🆗')
                }
            }).catch(() => {
                embed.react('⏲️')
            });
        });
    }
};
