const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Sesli kanaldan ayrılır."),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: false });

    const connection = joinVoiceChannel({
      channelId: interaction.member.voice.channelId,
      guildId: interaction.guildId,
      adapterCreator: interaction.guild.voiceAdapterCreator,
    });

    connection.destroy();

    const embed = new EmbedBuilder()
      .setAuthor({
        name: "Shini",
        iconURL: client.user.displayAvatarURL()
      })
      .setDescription(
        `**Sesli kanaldan ayrıldım** | \`${interaction.guild.members.me.voice.channel.name}\``
      )
      .setColor("Random")
      .setFooter({
        text: `${interaction.user.tag} tarafından istendi.`,
        iconURL: interaction.user.displayAvatarURL({ dynamic: true})
      });

    interaction.editReply({ embeds: [embed] });
  },
};
