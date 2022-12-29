const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("nowplaying")
    .setDescription("Şu anda çalan şarkıyı gösterir."),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = await client.distube.getQueue(interaction);
    if (!queue)
      return interaction.editReply({
        content: `Sırada şarkı bulunmamaktadır`,
        ephemeral: true,
      });

    const song = queue.songs[0];

    const status = (queue) =>
      `Volume: \`${queue.volume}%\`\nFilter: \`${
        queue.filters.names.join(", ") || "Off"
      }\`\nLoop: \`${
        queue.repeatMode
          ? queue.repeatMode === 2
            ? "All Queue"
            : "This Song"
          : "Off"
      }\`\nAutoplay: \`${queue.autoplay ? "On" : "Off"}\``;

    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setAuthor({
            name: "Now Playing",
            iconURL: "https://media.tenor.com/B-pEg3SWo7kAAAAi/disk.gif",
          })
          .setThumbnail(song.thumbnail)
          .setDescription(`[${song.name}](${song.url})`)
          .addFields({ name: "Status", value: `${status(queue)}` })
          .setFooter({
            text: `Requested by ${song?.user?.username}`,
            iconURL: song.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
