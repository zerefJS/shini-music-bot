const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("play")
    .setDescription("Müzik çalınmasını sağlar. < URL | Playlist | Şarkı Adı > girmeniz yeterlidir.")
    .addStringOption((option) =>
      option.setName("song").setDescription("song name").setRequired(true)
    ),
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply();

    try {
      const userChannelId = interaction.member.voice.channel.id;
      const clientChannelId = interaction.guild.members.me.voice.channel.id;
      const queue = await client.distube.getQueue(interaction);

      if ((queue?.playing || false) && userChannelId !== clientChannelId)
        return interaction.reply({
          content: "Şu anda başka kanalda müzik çalıyorum",
          ephemeral: true,
        });

      const string = interaction.options.getString("song");

      const options = {
        member: interaction.member,
        textChannel: interaction.channel,
      };

      await client.distube.play(
        interaction.member.voice.channel,
        string,
        options,
        interaction
      );

      interaction.editReply({
        content: "İşlem başarılı",
      });

      setTimeout(() => interaction.deleteReply(), 3000);

      if (interaction.member.voice.channel.type === 13)
        interaction.guild.members.me.voice.setSuppressed(false);
    } catch (error) {
      return interaction.editReply({
        content: "Bir şeyler yanlış gitti..",
        ephemeral: true,
      });
    }
  },
};
