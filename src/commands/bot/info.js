const { version, EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const os = require("os");
require("dotenv").config();

module.exports = {
  data: new SlashCommandBuilder()
    .setName("info")
    .setDescription("Bot hakkındaki bilgileri gösterir."),
  async execute(interaction, client) {
    const guildResult = await client.shard.fetchClientValues(
      "guilds.cache.size"
    );

    const userResult = await client.shard.broadcastEval((c) => {
      return c.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
    });

    const guildCount = guildResult.reduce((acc, guild) => acc + guild, 0);
    const userCount = userResult.reduce(
      (acc, memberCount) => acc + memberCount,
      0
    );

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
          value: `Serving ${guildCount} total guild servers.`,
          inline: true,
        },
        {
          name: "Channels",
          value: `Serving ${client.channels.cache.size} channels.`,
          inline: true,
        },
        {
          name: "Users",
          value: `Serving ${userCount} users.`,
          inline: true,
        },
        {
          name: "Join Date",
          value: client.user.createdAt.toLocaleDateString("tr-TR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
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
      )
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    return interaction.reply({ embeds: [embed] });
  },
};
