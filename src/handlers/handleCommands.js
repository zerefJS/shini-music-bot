const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");

const chalk = require("chalk");
const fs = require("fs");
const { SlashCommandBuilder } = require("discord.js");

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
        const commandHandler = new SlashCommandBuilder()
        for (const [key, value] of Object.entries(command)) {
          if (key === "name") {
            commandHandler.setName(value)
          } else if (key === "description") {
            commandHandler.setDescription(value)
          } else if (key === "userOptions") {
            const { name, description, required = false } = command.userOptions
            commandHandler.addUserOption(option => {
              return option.setName(name).setDescription(description).setRequired(required)
            })
          } else if (key === "stringOptions") {
            const { name, description, required = false } = command.stringOptions
            commandHandler.addStringOption(option => {
              return option.setName(name).setDescription(description).setRequired(required)
            })
          } else if (key === "numberOptions") {
            const { name, description, required = false, minValue = 0, maxValue = null } = command.numberOptions
            commandHandler.addNumberOption(option => {
              const options = option.setName(name).setDescription(description).setRequired(required)
              if (maxValue && minValue) option.setMaxValue(maxValue).setMinValue(minValue)
              return options
            })
          } else if (key === "channelOptions") {
            const { name, description, required = false, channelTypes = [] } = command.channelOptions
            commandHandler.addChannelOption(option => {
              const options = option.setName(name).setDescription(description).setRequired(required)
              if (channelTypes) option.addChannelTypes(...channelTypes)
              return options
            })
          }
        }

        commands.set(command.name, command);
        commandsArray.push(commandHandler.toJSON());
        console.log(chalk.cyan("[Command]: ", command.name));

        // commands.set(command.data.name, command);
        // commandsArray.push(command.data.toJSON());
        // console.log(chalk.cyan("[Command]: ", command.data.name));
      }
    }

    const clientId = "851543273515253790";
    const rest = new REST({
      version: "9",
    }).setToken(process.env.__TOKEN__);

    try {
      console.log(
        "[START APPLICATION COMMANDS]: Started refreshing application commands."
      );

      await rest.put(Routes.applicationCommands(clientId), {
        body: client.commandsArray,
      });
    } catch (error) {
      console.log(error);
    }
  };
};
