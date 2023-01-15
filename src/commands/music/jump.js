const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "jump",
  description: "Sıradaki istediğiniz numaralı müziğe geçmenizi sağlar.",
  numberOptions: {
    name: "number",
    description: "Şarkının sıradakı numarası",
    required: true
  },
  execute: async (interaction, client) => {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return await interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    const number = interaction.options.getNumber("number");

    try {
      await client.distube.jump(interaction.guild.id, parseInt(number));
      return await interaction.editReply({
        content: `Succesfly jumped! ${number}`,
      });
    } catch (error) {
      return await interaction.editReply({
        content: `Beklenmedik bir hata oluştu`,
        ephemeral: true,
      });
    }
  },
};
