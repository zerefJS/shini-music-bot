module.exports = {
    name: "finish",
    execute(queue) {
        queue.textChannel.send("Şarkı bitti ve sırada şarkı yoktu. Kanaldan çıktım")
    },
  };
  