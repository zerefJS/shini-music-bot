const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  name: "ping",
  description: "Botun gecikme süresini gösterir.",
  execute: async (interaction, client)  => {
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
