const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "forward",
  description: "Şarkıyı belirtilen süre kadar ileri sarar.",
  numberOptions: {
    name: "time",
    description: "İleri sarma süresi",
    required: true,
    minValue: 0
  },
  execute: async (interaction, client) => {
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
      interaction.editReply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });
    }
  },
};
