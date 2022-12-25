module.exports = {
  name: "messageCreate",
  async execute(message, client) {
    if (message.author.bot) return;
    
    if(message.content === "!pong") {
      message.channel.send("Pong! Ping!")
    }
  },
};

