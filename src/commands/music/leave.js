const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("leave")
    .setDescription("Sesli kanaldan ayrılır."),
  async execute(interaction, client) {
    await interaction.deferReply();

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
