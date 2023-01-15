const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "skip",
  description: "Sıradaki bir sonraki şarkıya geçer.",
  execute: async (interaction, client) => {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return await interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    try {
      const song = await queue.skip();
      return await interaction.editReply({
        content: `Skipped! Now playing:\n${song.name}`,
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
