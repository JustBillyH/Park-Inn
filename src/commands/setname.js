const Discord = require('discord.js');//REQUIRE MODULES HERE

exports.run = (Discord, client, message, args) => {
if (message.author.id === '399982462245011456') {
  const sayMessage = args.join(" ");
  client.user.setUsername(sayMessage);
  }
else {
  message.channel.send('You are not cool enough to run this command!')
  return;
  }
};

exports.conf = {
  enabled: false,//ofc this tells if the command is enabled or not
  guildOnly: false,//you can make this respond to you in guilds only or both dm and guild.
  aliases: [],
  permLevel: "Bot Owner" //KEEP THIS WHAT IT IS
};

exports.help = {
  name: "setname",//ex: reload
  description: "sets the name of the bot",//ex: reloads stuff
  usage: "setname [TEXT]",//ex: reload <command>
  category: "Bot Developers"
};