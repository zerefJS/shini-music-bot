const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("filter")
    .setDescription("Şarkıya filtre eklersiniz.")
    .addStringOption((option) =>
      option.setName("name").setDescription("Filtre adı:").setRequired(true)
    ),
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  async execute(interaction, client) {
    await interaction.deferReply();
    const queue = await client.distube.getQueue(interaction);
    const filter = interaction.options.getString("name") || "off";

    if (filter === "off" && queue.filters.size) queue.filters.clear();
    if (Object.keys(client.distube.filters).includes(filter)) {
      queue.filters.has(filter)
        ? queue.filters.remove(filter)
        : queue.filters.add(filter);
    } else {
      return interaction.editReply({
        content: `Not a valid filter`,
      });
    }

    const newEmbed = new EmbedBuilder()
      .setColor("Black")
      .setDescription(
        `Current Queue Filter: \`${queue.filters.names.join(", ") || "Off"}\``
      );

    await interaction
      .editReply({
        embeds: [newEmbed],
        ephemeral: false,
      })
      .catch((err) => console.log(err));
  },
};
