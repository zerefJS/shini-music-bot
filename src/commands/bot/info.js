const { version, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const os = require("os");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Bot hakkındaki bilgileri gösterir."),
  execute: async (interaction, client) => {
    const embed = new EmbedBuilder()
      .setThumbnail(client.user.displayAvatarURL())
      .setTitle("Shini Bot Stats")
      .setColor("Random")
      .addFields(
        {
          name: "Owner",
          value: `${
            interaction.client.users.cache.get(process.env.__OWNER_ID__)?.tag
          }`,
          inline: true,
        },
        {
          name: "Servers",
          value: `Serving ${client.shard
            .fetchClientValues("guilds.cache.size")
            .then((results) => {
              console.log(
                `${results.reduce(
                  (acc, guildCount) => acc + guildCount,
                  0
                )} total guilds`
              );
            })
            .catch(console.error)} servers.`,
          inline: true,
        },
        {
          name: "Channels",
          value: `Serving ${client.channels.cache.size} channels.`,
          inline: true,
        },
        {
          name: "Users",
          value: `Serving ${client.shard
            .broadcastEval((c) =>
              c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
            )
            .then((results) => {
              return results.reduce((acc, memberCount) => acc + memberCount, 0);
            })}).catch(console.error)} users.`,
          inline: true,
        },
        {
          name: "Join Date",
          value: client.user.createdAt.toLocaleDateString("tr-TR"),
          inline: true,
        },
        {
          name: "Discord.js Version",
          value: `${version}`,
          inline: true,
        },
        {
          name: "Node.js Version",
          value: `${process.version}`,
          inline: true,
        },
        {
          name: "Bot Version",
          value: `v1.0.0`,
          inline: true,
        },
        {
          name: "ARCH",
          value: `\`${os.arch()}\``,
          inline: true,
        },
        {
          name: "Platform",
          value: `\`${os.platform()}\``,
          inline: true,
        },
        {
          name: "Memory",
          value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(
            2
          )}mb`,
          inline: true,
        },
        {
          name: "CPU",
          value: `\`\`\`md\n${os.cpus().map((i) => `${i.model}`)[0]}\`\`\``,
          inline: true,
        }
      );
    return interaction.reply({ embeds: [embed] });
  },
};
