const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("forward")
    .setDescription("Şarkıyı belirtilen süre kadar ileri sarar.")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("İleri sarma süresi")
        .setRequired(true)
        .setMinValue(0)
    ),

  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
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
      queue.seek(queue.currentTime + time);
      return interaction.editReply({
        content: `Forward to ${time}!`,
      });
    } catch (error) {
      console.log(error.errorCode);
      interaction.editReply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });
    }
  },
};
