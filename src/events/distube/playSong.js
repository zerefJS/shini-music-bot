const { EmbedBuilder } = require("discord.js");

const status = (queue) =>
  `Volume: \`${queue.volume}%\` | Filter: \`${
    queue.filters.names.join(", ") || "Off"
  }\` | Loop: \`${
    queue.repeatMode
      ? queue.repeatMode === 2
        ? "All Queue"
        : "This Song"
      : "Off"
  }\` | Autoplay: \`${queue.autoplay ? "On" : "Off"}\``;

module.exports = {
  name: "playSong",
  execute(queue, song) {
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setAuthor({
            name: "Started Playing",
            iconURL: "https://media.tenor.com/B-pEg3SWo7kAAAAi/disk.gif",
          })
          .setThumbnail(song.thumbnail)
          .setDescription(`[${song.name}](${song.url})`)
          .setFooter({
            text: `Requested by ${song?.user?.username}`,
            iconURL: song.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
