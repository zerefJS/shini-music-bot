const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "repeat",
  description: "Tekrarlama modunu ayarlayın. Varsayılan olarak tekrarlamyı kapatır",
  stringOptions: {
    name: "mode",
    description: "Repeat mode < off | song | queue >",
  },
  execute: async (interaction, client) => {
    await interaction.deferReply();

    const queue = await client.distube.getQueue(interaction);

    if (!queue)
      return interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır!`,
      });


    let mode = 0

    const selectMode = interaction.options.getString("mode").trim() || mode; // default value = off

    if (!["off", "song", "queue".includes(selectMode)]) {
      console.log(selectMode)
      return interaction.editReply({
        content:
          "Lütfen geçerli bir tekrarlama modu girin **< off | song | queue >**",
        ephemeral: true,
      });
    }
    switch (selectMode) {
      case "off":
        mode = 0;
        break;
      case "song":
        mode = 1;
        break;
      case "queue":
        mode = 2;
        break;
    }
    mode = queue.setRepeatMode(mode);
    mode = mode
      ? mode === 2
        ? "Repeat queue"
        : "Repeat song"
      : "Off";
    await interaction.editReply({
      content: `Tekrarlama modu: \`${mode}\` olarak ayarlandı`,
    });
  },
};
