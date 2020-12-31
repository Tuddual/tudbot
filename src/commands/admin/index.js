const reset = require("./reset");
const setprefix = require("./setprefix");
const setcolor = require("./setcolor");
const admins = require("./admins");
const moderators = require("./moderators");
const addmoderator = require("./addmoderator");
const delmoderator = require("./delmoderator");

module.exports = {
    alias: {
        "reset": reset,

        "prefix": setprefix,
        "setprefix": setprefix,

        "color": setcolor,
        "setcolor": setcolor,

        "admin": admins,
        "admins": admins,
        "setadmin": admins,
        "setadmins": admins,

        "moderator": moderators,
        "moderators": moderators,
        "setmoderator": moderators,
        "setmoderators": moderators,

        "addmoderator": addmoderator,
        "addmoderators": addmoderator,

        "delmoderator": delmoderator,
        "delmoderators": delmoderator,
    },
    unique: [
        "reset",
        "setprefix",
        "setcolor",
        "admins",
        "moderators",
        "addmoderator",
        "delmoderator",
    ]
}
