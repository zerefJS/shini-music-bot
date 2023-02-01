const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  inSomeVoiceChannel: true,
  inClientVoiceChannel: true,
  inMemberVoiceChannel: true,
  cooldown: 20000,
  name: "filter",
  description: "Şarkıya filtre eklersiniz.",
  stringOptions: {
    name: "filter",
    description: "Filtre adı:",
    required: true
  },
  execute: async (interaction, client) => {
    await interaction.deferReply();
    const queue = await client.distube.getQueue(interaction);
    const filter = interaction.options.getString("filter") || "off";

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
