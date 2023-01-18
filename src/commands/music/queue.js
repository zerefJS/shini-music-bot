const {
  EmbedBuilder,
  ButtonStyle,
} = require("discord.js");

const { PaginationWrapper } = require("djs-button-pages");

const {
  NextPageButton,
  PreviousPageButton,
} = require("@djs-button-pages/presets");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "queue",
  description: "Sırada olan tüm şarkıları gösterir.",
  execute: async (interaction, client) => {
    const queue = await client.distube.getQueue(interaction);

    if (!queue)
      return interaction.reply({
        content: "Sırada şarkı bulunmamaktadır",
        ephemeral: true,
      });

    try {
      const songEmbeds = [];

      const buttons = [
        new PreviousPageButton({
          custom_id: "prev_page",
          emoji: "◀",
          style: ButtonStyle.Secondary,
        }),
        new NextPageButton({
          custom_id: "next_page",
          emoji: "▶",
          style: ButtonStyle.Secondary,
        }),
      ];

      for (let i = 0; i < queue?.songs?.length || 0; i += 20) {
        let song = queue.songs
          .slice(i === 0 ? i : i + 1, i === 0 ? i + 20 : i + 21)
          .map(
            (song, index) =>
              `${index + i === 0 ? "Playing:" : `${index + i}.`} ${`[${
                song.name.length > 50
                  ? song.name
                      .replace("[", "")
                      .replace("]", "")
                      .substring(0, 49) + "..."
                  : song.name.replace("[", "").replace("]", "")
              }](${song.url})`} - \`${song.formattedDuration}\``
          )
          .join("\n");

        songEmbeds.push(
          new EmbedBuilder()
            .setTitle("Sıradaki Şarkılar")
            .setColor("Random")
            .setThumbnail(`${client.user.displayAvatarURL({ dynamic: true })}`)
            .setDescription(`${song || "Sırada şarkı yok"}`)
            .setFooter({
              text: `Request by ${interaction.user.tag}`,
              iconURL: `${interaction.user.displayAvatarURL({ dynamic: true })}`,
            })
        );
      }


      const pagination = new PaginationWrapper()
        .setButtons(buttons)
        .setEmbeds(songEmbeds)
        .setTime(60000);

      return pagination.interactionReply(interaction);
    } catch (error) {
      console.log(error);
    }
  },
};
