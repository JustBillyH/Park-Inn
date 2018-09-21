const Discord = require('discord.js');

exports.run = (client, message, args, level) => { //OMG KEVIN IS ACTUALLY WORKING
  const msg = message;
  var Insults = ['Yo mama so ugly, she made onions cry.', 'Yo mama so fat, I took a picture of her last Christmas and it is still printing.', 'Yo mama so fat, she had to go to Sea World to get baptized.', 'Yo mama is so fat, her pants size is `*****` lose some weight.', 'Yo mama so dumb, she got locked in a grocery store and starved.', 'Yo mama so old, her birth certificate says expired on it.', 'Yo mama so dumb, she got hit by a parked car.', 'Yo mama is so dumb, she sat on the TV and watched the couch.', 'Yo mama is so dumb, when a burglar was stealing her TV she ran up to him and gave him the remote.', 'Yo mama so dumb, she thinks a quarterback is a refund.', 'Yo mama so dumb, she sold her car for gasoline money.', 'Yo mama so fat, Dora can not explore her.', 'Yo mama so dumb, she brought a spoon to the SuperBowl.', 'Yo mama so fat, when she sat on a dollar, George Washington sang, "Oh say can you see, get your fat `***` off me!"', 'Yo mama so dumb, she told a yo mama joke at an orphanage.', 'Yo mama so ugly, she made One Direction, go the other direction.', 'Yo mama so fat, the police busted her for carrying 12 pounds of "crack."', 'Yo mama is so fat, when I killed her in Call of Duty, I got a 5 player kill streak.', 'Yo mama so old, when I asked her for her age, she died.', 'Yo mama so dumb, she shoved a battery up her rear and yelled "I got the power!"'];
  args = args.join(' ');
  var Moderator = msg.author;
  
  if(args) {
    if(args.includes(msg.mentions) && !args.includes('@everyone') && !args.includes('@here') && args.includes('<@!')) {
      MessageEmbed(Moderator, 0X42F47A, msg.mentions.members.first() + ', ' + Insults[Math.floor(Math.random() * Insults.length)]);
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Now now, there is no need to roast everyone.');
    };
  } else {
    MessageEmbed(Moderator, 0X42F47A, '<@' + Moderator + '>, ' + Insults[Math.floor(Math.random() * Insults.length)]);
  };
  
function MessageEmbed(Mod1,Color,Description) {
  var embed = new Discord.MessageEmbed()
      .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
      .setColor(Color)
      .setDescription(Description);
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
  name: "yomama",
  category: "Fun Commands",
  description: "Tells the mentioned user a yo mama joke.",
  usage: "yomama [user]"
};