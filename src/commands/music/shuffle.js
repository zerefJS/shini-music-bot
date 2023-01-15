const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "shuffle",
  description: "Sıradaki şarkıları karıştırır.",
  execute: async (interaction, client) => {
    await interaction.deferReply();
    const queue = client.distube.getQueue(interaction);
    if (!queue) {
      return interaction.editReply({
        content: "Sırada şarkı yok",
        ephemeral: true,
      });
    }
    try {
      queue.shuffle();

      const newEmbed = new EmbedBuilder()
        .setColor("Black")
        .setDescription(`Sıradaki şarkılar başarılı bir şekilde karıştırıldı.`);

      await interaction
        .editReply({
          embeds: [newEmbed],
          ephemeral: false,
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.error;
    }
  },
};
