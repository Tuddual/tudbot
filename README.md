# tudbot
A simple discord bot with node.js.

## Features

**Admin commands**
* `!reset` : Command to reset the bot by default
* `!setprefix` : Command to edit the prefix
* `!setcolor` : Command to edit the color
* `!roles` : Command to describe admin role and moderator role
* `!admins` : Command to know who is an admin
* `!moderators` : Command to know who is a moderator
* `!setmoderators` : Command to edit who is a moderators

**Moderator commands**
* 

**Commands**
* `!help <command>` : Command to have a description for a specific command.
* `!commands` : Command to have a list of the commands

## Instalation

### Windows

* This bot is built on [discord.js](https://discord.js.org/) v12, so you'll need Node.js 12.0.0 (or newer) installed. Go to the [Node.js website](https://nodejs.org/) , download the latest version, open up the downloaded file, and follow the steps from the installer.

* Download the code with [git](https://git-scm.com/download/win) `git clone https://github.com/Tuddual/tudbot.git` or download the lastest [ZIP file](https://github.com/Tuddual/tudbot/archive/main.zip) or a [release version](https://github.com/Tuddual/tudbot/releases) and extract all folders and files from the ZIP file.

* In main folder (`cd tudbot`) install the dependencies with `npm install --only=production` (if you want to edit the code install the code with only `npm install`)

If you have any problem with the instalation, please [create an issue](https://github.com/Tuddual/tudbot/issues/new).

## Setting up

* Creating your bot on the [Discord Developer Portal](https://discord.com/developers/applications/) and copy the bot token. If you feel lost, you can follow the [Discord.js Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html) about setting up a bot application.

* Put the bot token in the tudbot/auth.json between the double quote.

* Invite your bot on your server on the [Discord Developer Portal](https://discord.com/developers/applications/). If you feel lost, you can follow the [Discord.js Guide](https://discordjs.guide/preparations/adding-your-bot-to-servers.html) about adding your bot to servers.

## Running the bot

### Running locally

Once all the installation and setup step is done, launch the bot with `npm start`.
