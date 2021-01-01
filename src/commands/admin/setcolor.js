const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to edit the border color of my embeds.',
    long_description: ` is a command to edit the border color (left) of my embeds.
    The color is currently set to \`${data.color}\`
    The color must be encoded in hexadecimal, you can choose it here: https://htmlcolorcodes.com/.`,
    use: `setcolor <newcolor>`,
    process: (msg, args) => {

        if (args.length === 0) {

            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`Color`)
                .setDescription(`\`${data.prefix}setcolor <newcolor>\` is a command to edit the border color (left) of my embeds.
                The color must be encoded in hexadecimal, you can choose it here: https://htmlcolorcodes.com/.
                Please specify a prefix.`);

            msg.channel.send(embed)
            .catch((error) => {
                console.error(error);
                msg.react('😞').catch(error => console.error(error));
            });

        } else {

            const reg_hex = /(|#)[0-9A-Fa-f]{6}/g

            if (reg_hex.test(args[0])) {

                msg.react('🆗').catch(error => console.error(error));

                const newcolor = args[0];

                data.color = (newcolor.length === 7 ? newcolor: '#' + newcolor );
                data.save();
                
                msg.reply(`the color has been successfully set to \`${data.color}\` !`)
                .catch((error) => {
                    console.error(error);
                    msg.react('😞').catch(error => console.error(error));
                });

            } else {

                msg.reply(`the color must be encoded in hexadecimal, you can choose it here: https://htmlcolorcodes.com/.`)
                .catch((error) => {
                    console.error(error);
                    msg.react('😞').catch(error => console.error(error));
                });
            }
        }
    }
};
