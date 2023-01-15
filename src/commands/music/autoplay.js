const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "autoplay",
  description: "Oto oynatma özelliğini ayarlar.",
  execute: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply({
        content: "Sırada şarkı yok",
      });
    const autoplay = queue.toggleAutoplay();
    const embed = new EmbedBuilder()
      .setDescription(`AutoPlay: \`${autoplay ? "Açık" : "Kapalı"}\``)
      .setColor("Random")
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi.`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
      });

    interaction.editReply({ embeds: [embed] });
  },
};
