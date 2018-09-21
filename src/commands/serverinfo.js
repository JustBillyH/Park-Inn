const Discord = require('discord.js');

exports.run = (client, message, args, level) => {
  const msg = message;
  
  var embed = new Discord.MessageEmbed()
  .setAuthor(msg.guild.name, msg.guild.iconURL())
  .setThumbnail(msg.guild.iconURL())
  .setColor(0X2355CF)
  .addField('Server ID', msg.guild.id, true)
  .addField('Server Name', msg.guild.name, true)
  .addField('Owner', msg.guild.owner.user.tag, true)
  .addField('Server Region', msg.guild.region, true)
  .addField('Verification Level', msg.guild.verificationLevel, true)
  .addField('Channels', msg.guild.channels.size, true)
  .addField('Members', msg.guild.memberCount, true)
  .addField('Online', msg.guild.members.size, true)
  .addField('Roles', msg.guild.roles.size, true)
  .addField('Highest Role', msg.guild.roles.highest.name, true)
  .setFooter('Server created on ')
  .setTimestamp(msg.guild.createdAt);
  msg.channel.send({ embed });
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "serverinfo",
  category: "Misc",
  description: "Gives some useful bot information.",
  usage: "serverinfo"
};