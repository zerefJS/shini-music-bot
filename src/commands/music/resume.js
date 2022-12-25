const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Varsayılan şarkıyı durdur."),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });

    if (queue.paused) {
      queue.resume();
      return interaction.reply({
        content: "Şarkı başarılı bir şekilde devam ettiriliyor.",
      });
    } else {
      return interaction.reply({
        content: "Şuan hiçbir şarkı durdurulmamış.",
      });
    }
  },
};
