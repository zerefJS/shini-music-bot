const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("move")
    .setDescription("Dinleyici ve botu belirtilen sesli kanala taşır.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Taşınılacak kanal")
        // Ensure the user can only select a TextChannel for output
        .addChannelTypes(ChannelType.GuildVoice, ChannelType.GuildStageVoice)
        .setRequired(true)
    ),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply({ ephemeral: false });

    const queue = await client.distube.getQueue(interaction);
    const channel = interaction.options.getChannel("channel");

    if (
      interaction.member.voice.channel !==
      interaction.guild.members.me.voice.channel
    )
      return interaction.editReply({
        content: "Aynı sesli kanalda olduğum üyeler bu komutu kullanabilir",
        ephemeral: true,
      });

    if (
      channel.id === interaction.member.voice.channel.id &&
      interaction.guild.members.me.voice.channel.id === channel.id
    )
      return await interaction.editReply({
        content: "Şu anda bu kanaldayiz zaten.",
        ephemeral: true,
      });

    function sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    }
    try {
      await queue.pause();
      await sleep(500);
      await client.distube.voices.join(channel);
      await interaction.member.voice.setChannel(channel);
      if (channel.type === 13)
        await interaction.guild.members.me.voice.setSuppressed(false);
      await sleep(500);
      await queue.resume();

      return interaction.editReply({
        embeds: [
          new EmbedBuilder()
            .setDescription(
              `**Sesli kanala geçiş yapıldı** | \`${channel.name}\``
            )
            .setColor("Random"),
        ],
      });
    } catch (err) {
      console.log(err);
    }
  },
};
