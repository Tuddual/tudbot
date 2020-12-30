const reset = require("./reset");
const setprefix = require("./setprefix");
const setcolor = require("./setcolor");
const roles = require("./roles");
const admins = require("./admins");
const moderators = require("./moderators");
const setmoderators = require("./setmoderators");

module.exports = {
    alias: {
        "reset": reset,

        "setprefix": setprefix,
        "prefix": setprefix,

        "setcolor": setcolor,
        "color": setcolor,

        "setroles": roles,
        "roles": roles,
        "setrole": roles,
        "role": roles,

        "admin": admins,
        "admins": admins,

        "moderator": moderators,
        "moderators": moderators,

        "setmoderator": setmoderators,
        "setmoderators": setmoderators
    },
    unique: [
        "reset",
        "setprefix",
        "setcolor",
        "setroles",
        "admins",
        "moderators",
        "setmoderators"
    ]
}