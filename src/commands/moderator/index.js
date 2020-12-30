

module.exports = {
    alias: {
        "test": {
            process: (msg) => {
                msg.channel.send("Test passed moderator :)");
            }
        }
    },
    unique: [
        
    ]
}
