module.exports = {
    name: "empty",
    execute(queue, song, channel, e) {
        queue.textChannel.send("Voice channel is empty! Leaving the channel...")
    },
  };
  