const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  data: new SlashCommandBuilder()
    .setName("repeat")
    .setDescription("Tekrarlama modunu ayarlayın.")
    .addStringOption((option) =>
      option
        .setName("mode")
        .setDescription("Repeat mode < off | song | queue >")
    ),
  async execute(interaction, client) {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır!`,
      });

    const repeatMode = {
      mode: 0, // off mode = 0;
    };

    const selectMode = interaction.options.getString("mode") || repeatMode.mode; // default value = off
    if (selectMode !== "off" || selectMode !== "song" || selectMode !== "queue")
      return interaction.editReply({
        content:
          "Lütfen geçerli bir tekrarlama modu girin **< off | song | queue >**",
        ephemeral: true,
      });
    switch (selectMode) {
      case "off":
        repeatMode.mode = 0;
        break;
      case "song":
        repeatMode.mode = 1;
        break;
      case "queue":
        repeatMode.mode = 2;
        break;
    }
    repeatMode.mode = queue.setRepeatMode(repeatMode.mode);
    repeatMode.mode = repeatMode.mode
      ? repeatMode.mode === 2
        ? "Repeat queue"
        : "Repeat song"
      : "Off";
    await interaction.editReply({
      content: `Tekrarlama modu: \`${repeatMode.mode}\` olarak ayarlandı`,
    });
  },
};
