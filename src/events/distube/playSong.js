const { EmbedBuilder } = require("discord.js");

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
