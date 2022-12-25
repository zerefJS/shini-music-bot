module.exports = {
    name: "disconnected",
    execute(queue) {
        const embed = new MessageEmbed()
            .setDescription(":x: | Disconnected from voice channel")
        queue.textChannel.send({ embeds: [embed] })
    }
}