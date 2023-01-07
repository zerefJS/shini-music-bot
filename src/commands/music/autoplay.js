const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("autoplay")
    .setDescription("Oto oynatma özelliğini ayarlar."),
  async execute(interaction, client) {
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
