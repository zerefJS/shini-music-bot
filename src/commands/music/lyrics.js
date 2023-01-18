const {
  EmbedBuilder,
  ButtonStyle
} = require("discord.js");

const { PaginationWrapper } = require("djs-button-pages");

const {
  NextPageButton,
  PreviousPageButton,
} = require("@djs-button-pages/presets");

const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client();
const _ = require("lodash");


module.exports = {
  cooldown: 20000,
  name: "lyrics",
  description: "Şarkının sözlerini bulmanızı sağlar.",
  stringOptions: {
    name: "song",
    description: "Song name"
  },
  execute: async (interaction, client) => {
    await interaction.deferReply()
    const queue =
      interaction.options.getString("song") || await client.distube.getQueue(interaction)?.songs[0]?.name;

    if (!queue) {
      interaction.reply({
        content: "Lütfen bir şarkı ismi girin",
        ephemeral: true,
      });

      return
    }

    const trackTitle = queue.replace(
      /official|music|video|hd|version|mix|\(|\)/gi,
      ""
    );
    const actualTrack = await GeniusClient.songs.search(trackTitle);
    const searches = actualTrack[0];
    const lyrics = await searches?.lyrics();
    const lyric = lyrics.split("\n")

    // if (!lyrics) {
    //   interaction.reply({
    //     content: "Lyrics bulunmadı",
    //     ephemeral: true,
    //   });

    //   return;
    // }

    try {

      const splitLyrics = _.chunk(lyric, 39);

      let pages = splitLyrics.map((ly) => {
        let embed = new EmbedBuilder()
          .setColor("Random")
          .setDescription(ly.join("\n"))

          console.log(Array.isArray(ly))
        return embed;
      });

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


      const pagination = new PaginationWrapper()
      .setButtons(buttons)
      .setEmbeds(pages)
      .setTime(60000);

    return pagination.interactionReply(interaction);


    } catch (error) {

      console.log(error)
    }


  },
};
