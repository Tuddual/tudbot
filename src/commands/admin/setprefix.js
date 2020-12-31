const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to edit the prefix used in front of every commands.',
    long_description: `\`${data.prefix}setprefix <newprefix>\` is a command to edit the prefix used in front of every commands.
    The prefix is currently set to \`${data.prefix}\``,
    use: `setprefix <newprefix>`,
    process: (msg, args) => {

        if (args.length === 0) {

            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`Prefix`)
                .setDescription(`\`${data.prefix}setprefix <newprefix>\` is a command to edit the prefix used in front of every commands.
                The prefix is currently set to \`${data.prefix}\``);

            msg.channel.send(embed)
            .catch((error) => {
                console.error(error);
                msg.react('😞').catch(error => console.error(error));
            });

        } else {

            msg.react('🆗').catch(error => console.error(error));

            data.prefix = args[0];
            data.save();
            
            msg.reply(`the prefix has been correctly set to \`${data.prefix}\` !`)
            .catch((error) => {
                console.error(error);
                msg.react('😞').catch(error => console.error(error));
            });
        }
    }
};
