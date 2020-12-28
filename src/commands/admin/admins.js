const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to ping admins',
    use: `${data.prefix}admins`,
    process: (msg) => {

        msg.guild.members.fetch()
        .then( members => {

            let admins = []
            members.each(GuildMember => {
                if (GuildMember.hasPermission('ADMINISTRATOR') && !GuildMember.user.bot) {
                    admins.push(GuildMember.user.id)
            }})
        
            let description = `Admin are people with the administrator permission. They have access to dangerous commands like \`${data.prefix}reset\`.
            If you want to allow someone to have access to admin commands, s·he just need to have the administrator permission. \n
            There ${admins.length > 1 ? 'are' : 'is'} actually ${admins.length} admin${admins.length > 1 ? 's' : ''} : \n`;
            admins.forEach(item => {
                description += ` - <@${item}>\n`;
            });
    
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle('Admins')
                .setDescription(description);
    
            msg.channel.send(embed);
        }).catch(() => {
            console.error("You need enable the option 'Server Members Intent' at 'https://discord.com/developers/applications'");
            msg.react('😞').catch(error => console.error(error));
        });
    }
};