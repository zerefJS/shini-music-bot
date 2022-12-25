const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Botun komutlarını gösterir."),
  async execute(interaction, client) {
    const embed = new EmbedBuilder()
      .setTitle(`${client.user.displayAvatarURL({ dynamic: true })}`)
      .setColor("Red")
      .setDescription([...client.commands].map(c => console.log(c.data.name, c.data.description)))
      .setTimestamp();
    interaction.reply({ embeds: [embed] });
  },
};
