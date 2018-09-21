const Discord = require('discord.js');

exports.run = async (client, message, [Option, Amount, ...Reason], level) => {
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "Super Administrator"
};

exports.help = {
  name: "purge",
  category: "Moderation",
  description: "Purges Messages?.",
  usage: "purge <option> <amount> [reason]"
};