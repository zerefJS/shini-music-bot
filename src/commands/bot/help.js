const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Botun komutlarını gösterir."),
  async execute(interaction, client) {
    const commandHelp = structuredClone(client.commandsArray)
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Shini Yardım Menüsü")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
      .setDescription(commandHelp.map(command => `<:emoji26:903604174770544671> **${command.name}:\n> ${command.description}**`).join("\n"))
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  },
};
