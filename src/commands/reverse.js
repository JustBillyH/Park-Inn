const Discord = require('discord.js');
const mapReverse = require('map-reverse');

exports.run = (client, message, Eh, level) => {
  const msg = message;
  Eh = Eh.join(' ');
  
  var b = mapReverse(Eh, function (item, index) {
      if (item % 2)
      Eh.slice(index, 1);
      return item;
  });
  var bb = b.join('');

  if(Eh) {
    var embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setColor(0X42F47A)
    .setDescription(bb);
    msg.channel.send({ embed });
  } else {
    var embed = new Discord.MessageEmbed()
    .setAuthor(msg.author.tag, msg.author.displayAvatarURL())
    .setColor(0XFF5151)
    .setDescription('It seems very blank...\nTry putting in a message next time.\n\nUsage: `reverse [message]`');
    msg.channel.send({ embed });
  };
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "reverse",
  category: "Fun Commands",
  description: "Reverses text.",
  usage: "reverse [message]"
};