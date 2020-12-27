const data = require("../../data");

const setup = require("./setup");

module.exports = {
    "setup": {
        description: "Command fully to setup the bot",
        use: `${data.prefix}setup`,
        process: (message) => { setup(message) }
    }
}