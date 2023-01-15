const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  name: "help",
  description: "Botun komutlarını gösterir.",
  execute: async (interaction, client) => {
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Shini Yardım Menüsü")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true }))
      .setDescription(
        client.commandsArray
          .map(
            (command) =>
              `<:emoji26:903604174770544671> **${command.name}:\n> ${command.description}**`
          )
          .join("\n")
      )
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  },
};
