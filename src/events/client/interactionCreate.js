module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const commands = client.commands;
      const commandName = interaction.commandName;
      const command = commands.get(commandName);

      if (!command) return;

      try {
        const member = interaction.member.voice.channel;
        const client = interaction.guild.members.me.voice.channel;

        if (command?.inSomeVoiceChannel && member !== client) {
          return interaction.reply({
            content: "Aynı sesli kanalda olmamız gerekiyor.",
            ephemeral: true,
          });
        } else if (command?.inClientVoiceChannel && !client) {
          return interaction.reply({
            content: "Sesli bir kanalda değilim",
            ephemeral: true,
          });
        } else if (!member && command.inMemberVoiceChannel) {
          return interaction.reply({
            content: "Sesli bir kanalda olmalısınız.",
            ephemeral: true,
          });
        } else {
          await command
            .execute(interaction, client)
            .catch((err) => console.log(err));
        }
      } catch (err) {
        console.log(err);
        await interaction.reply({
          content: "Something went wrong",
          ephemeral: true,
        });
      }
    }
  },
};
