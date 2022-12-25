const { ShardingManager } = require("discord.js");
require("dotenv").config();

const manager = new ShardingManager('./index.js', { token: process.env.__TOKEN__, totalShards: "auto" });
manager.on('shardCreate', shard => console.log(`Launched shard ${shard.id}`));
manager.spawn();