const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("stop")
    .setDescription("Sıradaki tüm şarkıları durdurur ve sesli kanaldan ayrılır."),
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
