module.exports = {
  name: "error",
  execute(queue, channel, e) {
    try {
      if (channel)
        queue.textChannel.send(
          `An error encountered: ${e.toString().slice(0, 60)}`
        );
      else console.error(e);
    } catch (error) {console.error}
  },
};
