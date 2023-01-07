const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Botun gecikme süresini gösterir."),
  async execute(interaction, client) {
    const message = await interaction.deferReply({
      fetchReply: true,
    });

    const newEmbed = new EmbedBuilder()
      .setColor("Black")
      .setDescription(
        `API Latency: ${client.ws.ping}ms\nClient Ping: ${
          message.createdTimestamp - interaction.createdTimestamp
        }ms`
      )
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true}),
      });

    await interaction
      .editReply({
        embeds: [newEmbed],
        ephemeral: false,
      })
      .catch((err) => console.log(err));
  },
};
