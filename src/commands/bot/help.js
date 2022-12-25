const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Botun komutlarını gösterir."),
  async execute(interaction, client) {
    const commandHelp = [];
    for (const command of client.commandsArray) {
      commandHelp.push(`> **${command.name}: ${command.description}**\n`);
    }
    const embed = new EmbedBuilder()
      .setColor("Random")
      .setTitle("Shini Yardım Menüsü")
      .setThumbnail(client.user.displayAvatarURL({ dynamic: true}))
      .setDescription(commandHelp.join("\n"))
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      })
      .setTimestamp();
    return interaction.reply({ embeds: [embed] });
  },
};
