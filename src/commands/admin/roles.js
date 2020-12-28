// The two next lines can't failed because they have been already executed in index.js
const process = require('process');
const Discord = require("discord.js");

module.exports = {
    description: 'Command to describe admin role and moderator role',
    use: `${process.env.prefix}roles`,
    process: (msg) => {

        const embed = new Discord.MessageEmbed()
            .setColor(process.env.color)
            .setTitle('Roles')
            .setDescription(`There are 2 differents roles, Admin and Moderator:
            - Admin are people with the permissions administrator. They have access to dangerous command like \`${process.env.prefix}reset\`.
            - Moderator are people who have access to more command than common mortal. You can add people to moderator through roles with \`${process.env.prefix}setmoderator\`.
            
            If you wonder who have access to wich command, you can use \`${process.env.prefix}commands <role>\` or \`${process.env.prefix}commands <someone>\`. You also see who has administrator permission with \`${process.env.prefix}admin\` and see who are moderators with \`${process.env.prefix}moderator\`.`);

        msg.channel.send(embed);
    }
};