// The two next lines can't failed because they have been already executed in index.js
const process = require('process');
const Discord = require("discord.js");

module.exports = {
    description: 'Command to ping admins',
    use: `${process.env.prefix}admins`,
    process: (msg) => {

        msg.guild.members.fetch()
        .then( members => {
            let admins = []

            members.each(GuildMember => {
                if (GuildMember.hasPermission('ADMINISTRATOR') && !GuildMember.user.bot) {
                    admins.push(GuildMember.user.id)
            }})
        
            let description = `Admin are people with the administrator permission. They have access to dangerous commands like \`${process.env.prefix}reset\`. \n
            There ${admins.length > 1 ? 'are' : 'is'} actually ${admins.length} admin${admins.length > 1 ? 's' : ''} :
            `;
            admins.forEach(item => {
                description += ` - <@${item}>\n`;
            });
    
            const embed = new Discord.MessageEmbed()
                .setColor(process.env.color)
                .setTitle('Admins')
                .setDescription(description);
    
            msg.channel.send(embed);
        }).catch((error) => {
            console.error(error);
            console.error("You need enable the option 'Server Members Intent' at 'https://discord.com/developers/applications'");
            msg.react('😞').catch(error => console.error(error));
        });
    }
};