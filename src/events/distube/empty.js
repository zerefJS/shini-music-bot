module.exports = {
    name: "empty",
    execute(queue) {
        queue.textChannel.send("Voice channel is empty! Leaving the channel...")
    },
  };
  