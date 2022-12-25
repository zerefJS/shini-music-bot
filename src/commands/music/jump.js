const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("jump")
    .setDescription("Sıradaki istediğiniz numaralı müziğe geçmenizi sağlar.")
    .addNumberOption((option) =>
      option
        .setName("number")
        .setDescription("İndex sırası.")
        .setRequired(true)
    ),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return await interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    const number = interaction.options.getNumber("number");

    try {
      await client.distube.jump(interaction.guild.id, parseInt(number + 1));
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
