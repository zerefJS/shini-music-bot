const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("rewind")
    .setDescription("Şarkıyı saniye bazında geri sayar.")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("Geri sarma süresi")
        .setRequired(true)
        .setMinValue(0)
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const time = interaction.options.getNumber("time");
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    try {
      queue.seek(queue.currentTime - time);
      return interaction.editReply({
        content: `Şarkı ${time} saniye geri sarıldı.`,
      });
    } catch (error) {
      interaction.editReply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });
    }
  },
};
