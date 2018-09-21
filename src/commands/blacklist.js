const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
  const msg = message;
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Bot Owner"
};

exports.help = {
  name: "blacklist",
  category: "Roblox",
  description: "Blacklists said player.",
  usage: "blacklist <user> <reason>"
};