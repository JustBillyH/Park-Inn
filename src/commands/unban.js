const Discord = require('discord.js');

exports.run = (client, message, [user, ...args], level) => {
  const msg = message;
  
  /**
   * @param {String} 
   */
  
  msg.guild.fetchBans().then(bans => {
    if(isNaN(parseInt(user))) {
      if(typeof bans.find(b => b.user.tag.toLowerCase() === user.toLowerCase()) == 'undefined') {
        //return user not found message
      } else {
        msg.guild.members.unban(bans.find(b => b.user.tag.toLowerCase() === user.toLowerCase())).then(unbannedUser => {
          //reply success message
        }).catch(e => {
          //reply unban error message
        });
      }
    } else {
      if(typeof bans.find(b => b.user.tag.toLowerCase() === user.toLowerCase()) == 'undefined') {
        //return user not found message
      } else {
        msg.guild.members.unban(user).then(unbannedUser => {
          //reply success message
        }).catch(e => {
          //reply unban error message
        });
      }
    }
  }).catch(e => {
    //reply cannot find bans error message
  });
  
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
  permLevel: "Bot Administrator"
};

exports.help = {
  name: "unban",
  category: "Moderation",
  description: "Unbans said player.",
  usage: "unban <userid/username>"
};