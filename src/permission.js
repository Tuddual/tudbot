let data = require("./data");

module.exports = {
    isAdmin: (member) => {
        return member.hasPermission('ADMINISTRATOR');
    },
    msgfromAdmin: (message) => {
        return message.member.hasPermission('ADMINISTRATOR');
    },
    isMod: (member) => {
        return member.hasPermission('ADMINISTRATOR') || member.roles.cache.some(r => data.moderator.includes(r.id));
    },
    msgfromMod: (message) => {
        if (this.isAdmin(message.member)) {
            return true;
        } else {
            message.guild.members.fetch(message.member.id); // Reaload the cache
            return this.isMod(message.member);
        }
    }
}
