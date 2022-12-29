const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Sıradaki tüm şarkıları durdurur ve sesli kanaldan ayrılır."),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    queue.stop();
    return interaction.editReply({
      content: `Sıradakı tüm şarkılar kaldırıldı ve müzik çalma işlemi iptal edildi...`,
    });
  },
};
