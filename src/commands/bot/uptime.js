const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  name: "uptime",
  description: "Botun çalışma süresini gösterir.",
  execute: async (interaction, client) => {
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
