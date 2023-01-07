const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("resume")
    .setDescription("Varsayılan şarkıyı durdur."),
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
