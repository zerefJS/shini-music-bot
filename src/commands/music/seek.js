const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("seek")
    .setDescription("Şarkının kaçıncı saniyesinden çalanacağı ayarlanır.")
    .addNumberOption((option) =>
      option
        .setName("time")
        .setDescription("Seek time")
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
      queue.seek(time);
      return interaction.editReply({
        content: `Seeked to ${time}!`,
      });
    } catch (error) {
      if (error.errorCode === "NO_UP_NEXT");
      console.log(error.errorCode);
      interaction.editReply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });
    }
  },
};
