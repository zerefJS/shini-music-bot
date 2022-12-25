const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("stop the song"),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply({
      ephemeral: false,
    });

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return await interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    queue.stop();
    return await interaction.editReply({
      content: `Sıradakı tüm şarkılar kaldırıldı ve müzik çalma işlemi iptal edildi...`,
    });
  },
};
