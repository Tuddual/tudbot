const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to know everything about a moderator.',
    long_description: ` is a command to know who are moderators.
    This command also mention how to become a moderator.`,
    use: `moderators`,
    process: async (msg) => {

        for (const askrole of data.moderator) {
            await msg.guild.roles.fetch(askrole)
            .then( role => {
                if (role === null) {
                    data.moderator = data.moderator.filter(item => item !== askrole);
                    data.save();
                }
            }).catch(error => console.error(error));
        }

        let description = `Moderators are people who have access to more command than regular people.
        If you want to give someone access to moderator commands, they just need to have a moderator role.\n    
        There ${data.moderator.length > 1 ? 'are' : 'is'} ${data.moderator.length} role${data.moderator.length > 1 ? 's' : ''} attributed as moderator : \n`;
        for (const item of data.moderator) {
            description += ` - <@&${item}>\n`;
        }

        description += `\n If you want to add a moderator role, use \`${data.prefix}addmoderator <role>\`
         If you want to remove a moderator role, use \`${data.prefix}delmoderator <role>\``;

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Moderators')
            .setDescription(description);

        msg.channel.send(embed)
        .catch((error) => {
            console.error(error);
            msg.react('😞').catch(error => console.error(error));
        });
    }
};
