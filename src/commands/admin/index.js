// const setup = require("./setup");
const setprefix = require("./setprefix");
const setcolor = require("./setcolor");
const roles = require("./roles");
const admins = require("./admins");

module.exports = {
    // "setup": setup,

    "setprefix": setprefix,
    "prefix": setprefix,

    "setcolor": setcolor,
    "color": setcolor,

    "setroles": roles,
    "roles": roles,
    "setrole": roles,
    "role": roles,

    "admin": admins,
    "admins": admins
}