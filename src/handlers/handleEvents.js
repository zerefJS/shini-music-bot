const chalk = require("chalk");
const fs = require("fs");

const { connection } = require("mongoose");

module.exports = (client) => {
  client.handleEvents = async () => {
    const eventsFolders = fs.readdirSync("./src/events");
    for (const folder of eventsFolders) {
      const eventsFiles = fs
        .readdirSync(`./src/events/${folder}`)
        .filter((file) => file.endsWith(".js"));

      switch (folder) {
        case "client":
          for (const file of eventsFiles) {
            const event = require(`../events/${folder}/${file}`);
            if (event.once) {
              client.once(event.name, (...args) =>
                event.execute(...args, client)
              );
              console.log(chalk.blue("[Client Event]: ", event.name));
            } else {
              client.on(event.name, (...args) =>
                event.execute(...args, client)
              );
              console.log(chalk.blue("[Client Event]: ", event.name));
            }
          }

          break;

        case "mongo":
          for (const file of eventsFiles) {
            const event = require(`../events/${folder}/${file}`);
            connection.on(event.name, (...args) =>
              event.execute(...args, client)
            );
            console.log(chalk.greenBright("[Mongoose Event]: ", event.name));
          }
          break;
        case "distube":
          for (const file of eventsFiles) {
            const event = require(`../events/${folder}/${file}`);
            client.distube.on(event.name, (...args) =>
              event.execute(...args, client)
            );
            console.log(chalk.red("[Distube Event]: ", event.name));
          }
          break;

        default:
          break;
      }
    }
  };
};
