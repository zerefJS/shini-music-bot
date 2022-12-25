const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  ShardingManager
} = require("discord.js");

const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { DeezerPlugin } = require("@distube/deezer");

const { connect } = require("mongoose");
const fs = require("fs");

require("dotenv").config();
const {
  __TOKEN__,
  __MONGO_DATABASE_URL__,
  __SPOTIFY_CLIENT_ID__,
  __SPOTIFY_CLIENT_SECRET__,
} = process.env;

const client = new Client({
  intents: Object.keys(GatewayIntentBits),
  partials: Object.keys(Partials),
});

client.distube = new DisTube(client, {
  leaveOnEmpty: true,
  leaveOnStop: true,
  emptyCooldown: 30,
  leaveOnFinish: true,
  emitNewSongOnly: true,
  plugins: [
    new SpotifyPlugin({
      parallel: true,
      emitEventsAfterFetching: false,
      api: {
        clientId: __SPOTIFY_CLIENT_ID__,
        clientSecret: __SPOTIFY_CLIENT_SECRET__,
      },
    }),
    new SoundCloudPlugin(),
    new DeezerPlugin(),
  ],
});

client.commands = new Collection();
client.commandsArray = [];

const functionFolders = fs.readdirSync("./src/functions");
for (const folder of functionFolders) {
  const functionFiles = fs
    .readdirSync(`./src/functions/${folder}`)
    .filter((file) => file.endsWith(".js"));

  for (const file of functionFiles) {
    require(`./src/functions/${folder}/${file}`)(client);
  }
}

client.handleEvents();
client.handleCommands();
client.login(__TOKEN__);

connect(__MONGO_DATABASE_URL__).catch(err => console.log(err));
