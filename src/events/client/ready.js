const { ActivityType } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    console.log(`${client.user.tag} is awesome and ready for discord`);
    client.user.setPresence({
      activities: [{ name: `Sessizliği`, type: ActivityType.Listening }],
      status: "online",
    });
  },
};
