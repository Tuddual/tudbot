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
                description += ` - <@${item}> \n`;
            });
        }

        description += `
        - React with :high_brightness: to add a role
        - React with :anger: to delete a role
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

                const reaction = collected.first();

                if (reaction.emoji.name === '🔆') {
                    
                } else if (reaction.emoji.name === '💢') {
                    
                } else {
                    embed.react('🆗').catch(error => console.error(error));
                }
            }).catch(() => {
                embed.react('⏲️').catch(error => console.error(error));
            });
        });
    }
};
