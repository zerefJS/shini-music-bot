const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("return my ping"),
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
      );

    await interaction.editReply({
      embeds: [newEmbed],
      ephemeral: false,
    }).catch(err => console.log(err));
  }
};
