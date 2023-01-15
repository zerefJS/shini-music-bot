const {
  SlashCommandBuilder,
  EmbedBuilder,
  ChannelType,
} = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "move",
  description:"Dinleyici ve botu belirtilen sesli kanala taşır.",
  channelOptions: {
    name: "channel",
    description: "Taşınılacak kanal",
    required: true,
    channelTypes: [ChannelType.GuildVoice, ChannelType.GuildStageVoice]
  },
  execute: async (interaction, client) => {
    await interaction.deferReply({ ephemeral: false });

    const queue = await client.distube.getQueue(interaction);
    const channel = interaction.options.getChannel("channel");

    if(!channel) return interaction.editReply({
      content: "Bir kanala ihtiyacım var!",
      ephemeral: true
    })

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
      return interaction.editReply({
        content: "Şu anda bu kanaldayiz zaten.",
        ephemeral: true,
      });


    try {
      await queue.pause();
      await client.distube.voices.join(channel);
      await interaction.member.voice.setChannel(channel);
      if (channel.type === 13)
        await interaction.guild.members.me.voice.setSuppressed(false);
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
