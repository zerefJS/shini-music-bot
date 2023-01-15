const ms = require("ms");

module.exports = {
  name: "interactionCreate",
  async execute(interaction, client) {
    if (interaction.isChatInputCommand()) {
      const commands = client.commands;
      const cooldowns = client.cooldown;
      const commandName = interaction.commandName;
      const cooldownCommand = `${interaction.user.id}/${commandName}`;
      const command = commands.get(commandName);
      if (!command) return;
      try {
        const member = interaction.member.voice.channel;
        const clientVoiceChannel = interaction.guild.members.me.voice.channel;

        if (cooldowns.has(cooldownCommand)) {
          const time = ms(cooldowns.get(cooldownCommand) - Date.now(), {
            long: true,
          });
          return interaction.reply({
            content: `${time
              .replace("seconds", "saniye")
              .replace("ms", "milisaniye")} beklemeniz gerekmektedir`,
          });
        } else {
          cooldowns.set(cooldownCommand, Date.now() + command.cooldown);
          setTimeout(() => cooldowns.delete(cooldownCommand), command.cooldown);
        }

        if (command?.inClientVoiceChannel && !clientVoiceChannel) {
          return interaction.reply({
            content: "Sesli bir kanalda değilim",
            ephemeral: true,
          });
        } else if (!member && command.inMemberVoiceChannel) {
          return interaction.reply({
            content: "Sesli bir kanalda olmalısınız.",
            ephemeral: true,
          });
        } else if (
          command?.inSomeVoiceChannel &&
          member !== clientVoiceChannel
        ) {
          return interaction.reply({
            content: "Aynı sesli kanalda olmamız gerekiyor.",
            ephemeral: true,
          });
        } else {
          console.log(command)
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
