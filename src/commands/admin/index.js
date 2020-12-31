const reset = require("./reset");
const setprefix = require("./setprefix");
const setcolor = require("./setcolor");
const admins = require("./admins");
const moderators = require("./moderators");
// const setmoderators = require("./setmoderators");

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
        "setmoderators": moderators
    },
    unique: [
        "reset",
        "setprefix",
        "setcolor",
        "admins",
        "moderators",
        "setmoderators"
    ]
}
