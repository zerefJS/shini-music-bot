const { EmbedBuilder } = require("discord.js")

module.exports = {
  name: "addSong",
  execute(queue, song, client) {
    queue.textChannel.send({
      embeds: [
        new EmbedBuilder()
          .setAuthor({
            name: "Şarkı Sıraya Eklenildi",
            iconURL: client.user.displayAvatarURL()
          })
          .setColor("Random")
          .setThumbnail(song?.thumbnail)
          .setDescription(
            `[${
              song.name.length >= 64
                ? song.name.substring(0, 49) + "..."
                : song.name
            }](${song.url})`
          )
          .setFooter({
            text: `Request by ${song.user.tag}`,
            iconURL: song.user.displayAvatarURL({
              dynamic: true,
            }),
          }),
      ],
    });
  },
};
