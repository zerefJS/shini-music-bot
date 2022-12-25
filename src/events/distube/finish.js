module.exports = {
    name: "finish",
    execute(queue, channel) {
        queue.textChannel.send("Şarkı bitti ve sırada şarkı yoktu. Kanaldan çıktım")
    },
  };
  