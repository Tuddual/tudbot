const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to describe admin role and moderator role',
    use: `${data.prefix}roles`,
    process: (msg) => {

        const embed = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Roles')
            .setDescription(`There are 2 differents roles, Admin and Moderator:
            - Admin are people with the administrator permission. They have access to dangerous commands like \`${data.prefix}reset\`.
            - Moderator are people who have access to more command than common mortal. You can add people to moderator through roles with \`${data.prefix}setmoderator\`.
            
            If you wonder who have access to wich command, you can use \`${data.prefix}commands <role>\` or \`${data.prefix}commands <someone>\`. You also see who has administrator permission with \`${data.prefix}admin\` and see who are moderators with \`${data.prefix}moderator\`.`);

        msg.channel.send(embed);
    }
};