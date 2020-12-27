const setup = require("./setup.js");

module.exports = {
    "setup": {
        description: "Use once to start and set up the bot.",
        process: (message) => { setup(message) }
    }
}