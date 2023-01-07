const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("uptime")
    .setDescription("Botun çalışma süresini gösterir."),
  async execute(interaction, client) {
    const days = Math.floor(client.uptime / 86400000);
    const hours = Math.floor(client.uptime / 3600000) % 24;
    const minutes = Math.floor(client.uptime / 60000) % 60;
    const seconds = Math.floor(client.uptime / 1000) % 60;
    const embed = new EmbedBuilder()
      .setTitle(`${client.user.username}`)
      .setColor("Red")
      .addFields({
        name: "Uptime",
        value: ` **${days} gün ${hours} saat ${minutes} dakika ${seconds} saniye**`,
        inline: true
      })
      .setTimestamp()
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });
    interaction.reply({ embeds: [embed] });
  },
};
