const { MessageEmbed } = require("discord.js");
let data = require("../../data");

module.exports = {
    description: 'Command to add a moderator role.',
    long_description: `\`${data.prefix}addmoderator <newmoderator>\` is a command to add a moderator role.
    More information about moderator can be found with \`${data.prefix}moderators\``,
    use: `addmoderator <newmoderator>`,
    process: (msg, args) => {

        if (args.length === 0) {

            const embed = new MessageEmbed()
                .setColor(data.color)
                .setTitle(`Prefix`)
                .setDescription(`\`${data.prefix}addmoderator <newmoderator>\` is a command to add a moderator role.
                Please specify the role to add.`);

            msg.channel.send(embed)
            .catch((error) => {
                console.error(error);
                msg.react('😞').catch(error => console.error(error));
            });

        } else {

            const regex_role = /<@&[0-9]{18}>/g

            if (regex_role.test(args[0])) {

                const newrole = args[0].slice(3, 21);

                if (!data.moderator.includes(newrole)) {

                    msg.react('🆗').catch(error => console.error(error));

                    data.moderator.push(newrole);
                    data.save();
                    
                    msg.reply(`<@&${newrole}> has been successfully added as a moderator role!`)
                    .catch((error) => {
                        console.error(error);
                        msg.react('😞').catch(error => console.error(error));
                    });

                } else {

                    msg.reply(`<@&${newrole}> is already set as a moderator role!`)
                    .catch((error) => {
                        console.error(error);
                        msg.react('😞').catch(error => console.error(error));
                    });

                }

            } else {

                msg.reply(`you must @ a role to add.`)
                .catch((error) => {
                    console.error(error);
                    msg.react('😞').catch(error => console.error(error));
                });
            }
        }
    }
};
