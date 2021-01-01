const { MessageEmbed } = require("discord.js");
let data = require("../../data");
const perm = require("../../permission");

module.exports = {
    description: 'Command to know everything about an admin.',
    long_description: ` is a command to know who are admins.
    This command also mention how to become an admin and which person is an admin.`,
    use: `admins`,
    process: (msg) => {

        msg.guild.members.fetch()
        .then( members => {

            let admins = []
            members.each(GuildMember => {
                if (perm.isAdmin(GuildMember) && !GuildMember.user.bot) {
                    admins.push(GuildMember.user.id)
            }})
        
            let description = `Admin are people with the administrator permission. They have access to dangerous commands.
            If you want to allow someone to have access to admin commands, s·he just need to have the administrator permission.\n
            There ${admins.length > 1 ? 'are' : 'is'} currently ${admins.length} admin${admins.length > 1 ? 's' : ''} : \n`;
            for (const item of admins) {
                description += ` - <@${item}>\n`;
            }
    
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle('Admins')
                .setDescription(description);
    
            msg.channel.send(embed)
            .catch((error) => {
                console.error(error);
                msg.react('😞').catch(error => console.error(error));
            });
            
        }).catch(() => {
            console.error("You need enable the option 'Server Members Intent' at 'https://discord.com/developers/applications'");
            msg.react('😞').catch(error => console.error(error));
        });
    }
};
