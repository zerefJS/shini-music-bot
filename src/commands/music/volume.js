const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("volume")
    .setDescription("Şarkının ses düzeyini ayarlarsanız. Varsayılan olarak 100 yapar.")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("0-200 arasında bir sayı girin.")
        .setMinValue(0)
        .setMaxValue(200)
    ),
  async execute(interaction, client) {
    const volumeNumber = interaction.options.getNumber("number") || 100;
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });

    if(volumeNumber < 0 && volumeNumber > 200) return interaction.reply({
      content: "Sayı aralığnı aştınız. 0 ile 200 (dahil) arasında bir sayın",
      ephemeral: true
    })

    queue.setVolume(volumeNumber);
    return await interaction.reply({
      content: `Ses düzeyi: ${volumeNumber} olarak ayarlanmıştır.`,
    });
  },
};
