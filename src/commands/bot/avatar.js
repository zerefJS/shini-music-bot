const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  cooldown: 20000,
  name: "avatar",
  userOptions: {
    name: "user",
    description: "Avatarı Gösterilecek Kişi",
  },
  description: "Kullanıcın avatarını gösterir.",
  execute: async (interaction, client) => {
    await interaction.deferReply();
    const selectedUser =
      interaction.options.getUser("user") || interaction.user;

    const avatar = `https://cdn.discordapp.com/avatars/${selectedUser.id}/${selectedUser.avatar}.png?size=1024`;

    const embed = new EmbedBuilder()
      .setTitle(`**${selectedUser.tag}'s avatar**`)
      .setDescription(
        `**Link as**\n [png](${avatar}) | [jpg](${avatar.replace(
          "png",
          "jpg"
        )}) | [webp](${avatar.replace("png", "webp")})`
      )
      .setFooter({
        text: `${selectedUser.tag} tarafından istendi`,
        iconURL: avatar,
      })
      .setImage(avatar);

    await interaction.editReply({
      embeds: [embed],
    });
  },
};
