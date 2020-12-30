const { MessageEmbed } = require("discord.js");
let data = require("../../data");

const adminCmds = require("../admin"); // Admin commands
const modCmds = require("../moderator"); // Moderator commands
const allCmds = require("../everyone"); // Everyone commands

module.exports = (msg, args) => {

    const admin = msg.member.hasPermission('ADMINISTRATOR');
    const mod = msg.member.roles.cache.some(r => data.moderator.includes('<@&' + r.id + '>'));

    if (args.lenght === 0) {

        msg.reply(`, you need to specify a command like \`${data.prefix} <command>\``)

    } else {
        const command = args[0];

        if (Object.keys(adminCmds.alias).includes(command) && admin) {
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`${data.prefix}${command}`)
                .setDescription(`This command can only be used by admins.
                
                use : \`${data.prefix}${adminCmds.alias[command].use}\`
                description : ${adminCmds.alias[command].description}`);

            msg.channel.send(embed);

        } else if (Object.keys(modCmds.alias).includes(command) && (admin || mod)) {
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`${data.prefix}${command}`)
                .setDescription(`This command can only be used by moderators.
                
                use : \`${data.prefix}${adminCmds.alias[command].use}\`
                description : ${modCmds.alias[command].description}`);
                
            msg.channel.send(embed);

        } else if (Object.keys(allCmds.alias).includes(command)) {
            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`${data.prefix}${command}`)
                .setDescription(`This command can be used by everyone.
                
                use : \`${data.prefix}${adminCmds.alias[command].use}\`
                description : ${allCmds.alias[command].description}`);
                
            msg.channel.send(embed);

        } else {
            msg.reply(`, command \`${data.prefix}${command}\` not recognized !`)
        }
    }
};