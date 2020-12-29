const { MessageEmbed } = require("discord.js");
let data = require("../../data");

const timelimit = 3600000; // 1 hour

module.exports = {
    description: 'Command to edit who is a moderators',
    use: `${data.prefix}setmoderators`,
    process: (msg) => {

        let description = `Moderators are people who have access to more command than common mortal. `;

        if (data.moderator.length === 0) {
            description += `There is no role assigned as moderator.\n`
        } else if (data.moderator.length === 1){
            description += `This is the role asigned as moderator : ${data.moderator[0]}\n`;
        } else {
            description += `This are the roles asigned as moderator :\n`;
            data.moderator.forEach(item => {
                description += ` - ${item} \n`;
            });
        }

        description += `
        - React with :high_brightness:, and @ the role in the chat to add a role
        - React with :anger:, and @ the role in the chat to delete a role
        - React with :white_check_mark: if everything is good`;

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Moderator')
            .setDescription(description);

        msg.channel.send(embed)
        .then(embed => {

            embed.react('🔆')
            .then(embed.react('💢')
            .then(embed.react('✅')
            .catch(error => console.error(error)))
            .catch(error => console.error(error)))
            .catch(error => console.error(error));

            const filter = (reaction, user) => ['🔆', '💢', '✅'].includes(reaction.emoji.name) && user.id === msg.author.id;
            embed.awaitReactions(filter, { max: 1, time: timelimit, error: ['time'] })
            .then(collected => {

                embed.react('🆗').catch(error => console.error(error));
                const reaction = collected.first();

                if (reaction.emoji.name === '🔆' || reaction.emoji.name === '💢') {
                    
                    const regex_role = /<@&[0-9]{18}>/g
                    const filter2 = m => regex_role.test(m.content) && m.author.id === msg.author.id;
                    msg.channel.awaitMessages(filter2, { max: 1, time: timelimit, error: ['time'] }).then(collected => {

                        const role = collected.first().content;
                        
                        if (reaction.emoji.name === '🔆') {
                            if (data.moderator.includes(role)) {
                                msg.reply("The role is already as moderator.");
                            } else {
                                data.moderator.push(role);
                                data.save();
                            }
                        } else {
                            if (data.moderator.includes(role)) {
                                data.moderator = data.moderator.filter(item => item !== role);
                                data.save();
                            } else {
                                msg.reply("The role is already as not moderator.");
                            }
                        }
                        module.exports.process(msg);
                    }).catch(() => {
                        embed.react('⏲️').catch(error => console.error(error));
                    });
                }
            }).catch(() => {
                embed.react('⏲️').catch(error => console.error(error));
            });
        });
    }
};
