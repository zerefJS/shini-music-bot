const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "previous",
  description: "Bir önceki şarkıya geçer.",
  execute: async (interaction, client) => {
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.reply({
        content: " There is nothing in the queue right now!",
        ephemeral: true,
      });

    try {
      if (queue.previousSongs || queue.previousSongs.length === 0)
        return interaction.reply({
          content: "There are no previous Songs!",
          ephemeral: true,
        });

      const song = queue.previous();

      return interaction
        .reply({
          content: `Now playing:\n${song.name}`,
        })
        .catch(console.error);
    } catch (error) {
      console.log(error);
      if (error.errorCode === "NO_PREVIOUS")
        interaction.reply({
          content: "Daha öncesine ait şarkı bulunamadı",
          ephemeral: true,
        });
      else
        interaction.reply({
          content: "Beklenmedik bir hata oluştu",
          ephemeral: true,
        });
    }
  },
};
