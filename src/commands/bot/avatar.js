const {
  SlashCommandBuilder,
  EmbedBuilder
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("avatar")
    .setDescription("Kullanıcın avatarını gösterir")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("The user you'd like to view avatar")
    ),
  async execute(interaction, client) {
    const selectedUser =
      interaction.options.getUser("user") || interaction.user;

    const avatar = `https://cdn.discordapp.com/avatars/${selectedUser.id}/${selectedUser.avatar}.png?size=1024`;
    await interaction.deferReply();

    const embed = new EmbedBuilder()
      .setTitle(`**${selectedUser.tag}'s avatar**`)
      .setDescription(
        `**Link as**\n [png](${avatar}) | [jpg](${avatar.replace("png","jpg")}) | [webp](${avatar.replace("png","webp")})`)
      .setImage(
        `${avatar}`
      )

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
