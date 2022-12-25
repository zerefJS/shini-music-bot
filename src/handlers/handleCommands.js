const { REST } = require("@discordjs/rest");
const chalk = require("chalk");
const { Routes } = require("discord-api-types/v9");
const fs = require("fs");
require("dotenv").config();

module.exports = (client) => {
  client.handleCommands = async () => {
    const commandFolders = fs.readdirSync("./src/commands");
    for (const folder of commandFolders) {
      const commandFiles = fs
        .readdirSync(`./src/commands/${folder}`)
        .filter((file) => file.endsWith(".js"));

      const { commands, commandsArray } = client;
      for (const file of commandFiles) {
        const command = require(`../commands/${folder}/${file}`);
        commands.set(command.data.name, command);
        commandsArray.push(command.data.toJSON());
        console.log(chalk.cyan("[Command]: ", command.data.name));
      }
    }

    const clientId = "851543273515253790";
    const rest = new REST({
        version: "9"
    }).setToken(process.env.__TOKEN__)

    try {
        console.log("[START APPLICATION COMMANDS]: Started refreshing application commands.");

        await rest.put(Routes.applicationCommands(clientId), {
            body: client.commandsArray,

        })
    } catch (error) {
        console.log(error)
    }

  };
};
