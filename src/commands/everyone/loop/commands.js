const { MessageEmbed } = require("discord.js");
let data = require("../../../data");
const perm = require("../../../permission");

const adminCmds = require("../../../admin"); // Admin commands
const modCmds = require("../../moderator"); // Moderator commands
const allCmds = require("../../everyone"); // Everyone commands

module.exports = (msg) => {


    if (perm.msgfromAdmin(msg)) {

        let description_admin = `The list below are commands that only admin can use : \n`
        for (const [, value] of Object.entries(adminCmds.unique)) {
            description_admin += ` - \`${data.prefix}${adminCmds.alias[value].use}\` : ${adminCmds.alias[value].description}\n`;
        }

        const embed_admin = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Admin commands')
            .setDescription(description_admin);

        msg.channel.send(embed_admin)
        .catch((error) => {
            console.error(error);
            msg.react('😞').catch(error => console.error(error));
        });
    }
    if (perm.msgfromMod(msg)) {

        let description_mod = `The list below are commands that only moderators can use : \n`
        for (const [, value] of Object.entries(modCmds.unique)) {
            description_mod += ` - \`${data.prefix}${modCmds.alias[value].use}\` : ${modCmds.alias[value].description}\n`;
        }

        const embed_mod = new MessageEmbed()
            .setColor(data.color)
            .setTitle('Moderator commands')
            .setDescription(description_mod);

        msg.channel.send(embed_mod)
        .catch((error) => {
            console.error(error);
            msg.react('😞').catch(error => console.error(error));
        });
    }

    let description_all = `The list below are commands that everybody can use : \n`
    for (const [, value] of Object.entries(allCmds.unique)) {
        description_all += ` - \`${data.prefix}${allCmds.alias[value].use}\` : ${allCmds.alias[value].description}\n`;
    }

    const embed_all = new MessageEmbed()
        .setColor(data.color)
        .setTitle('Commands')
        .setDescription(description_all);

    msg.channel.send(embed_all)
    .catch((error) => {
        console.error(error);
        msg.react('😞').catch(error => console.error(error));
    });
};
