const Discord = require("discord.js");

let data = require("./data.json");

module.exports = {
    "wakeup": {
        description: "Use once to start and set up the bot.",
        process: function (msg) {
            channel = msg.channel; // Channel where the message has been writeen and where we will respond
            user = msg.member; // User that has send the message
            if(data.setup === false) {
                data.setup = "ongoing"; // Only one user can start the setup

                channel.send("https://tenor.com/btkqj.gif");
                channel.send("First of all, thank you for using tudbot! :heart: \nWe need to set up few things before starting !");

                data.setup = true;
            } else if(data.setup === "ongoing") {
                channel.send("There is already an admin going through the setup !");
            } else {
                channel.send("The bot has already been setup !")
            }
        }
    }
}