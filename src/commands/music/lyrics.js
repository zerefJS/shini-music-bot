const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const Genius = require("genius-lyrics");
const GeniusClient = new Genius.Client();

module.exports = {
  cooldown: 20000,
  name: "lyrics",
  description: "Şarkının sözlerini bulmanızı sağlar.",
  stringOptions: {
    name: "song",
    description: "Song name"
  },
  execute: async (interaction, client) => {
    await interaction.deferReply();
    const queue =
      interaction.options.getString("song") ||
      (await client.distube.getQueue(interaction)?.songs[0]?.name);

    if (!queue)
      return interaction.editReply({
        content: "Lütfen bir şarkı ismi girin",
        ephemeral: true,
      });

    const trackTitle = queue.replace(
      /official|music|video|hd|version|mix|\(|\)/gi,
      ""
    );
    const actualTrack = await GeniusClient.songs.search(trackTitle);
    const searches = actualTrack[0];
    const lyrics = await searches?.lyrics();

    if (!lyrics)
      return interaction.editReply({
        content: "Lyrics bulunmadı",
        ephemeral: true,
      });
    return interaction.editReply({
      embeds: [
        new EmbedBuilder()
          .setColor("Random")
          .setAuthor({
            name: `Lyrics for ${searches?.fullTitle || queue}`,
          })
          .setDescription(`${lyrics}`)
          .setFooter({
            text: `${interaction.user.tag} tarafından istendi.`,
            iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
          })
          .setTimestamp(),
      ],
    });
  },
};
