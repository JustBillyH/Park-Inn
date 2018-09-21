const Discord = require('discord.js');
const rbx = require('roblox-js');

exports.run = async (client, message, [Username], level) => {
  const msg = message;
  var Moderator = msg.author;
  rbx.login('ParkManage', process.env.BOT_PASSWORD);
  await rbx.login('ParkManage', process.env.BOT_PASSWORD);
  
    if (Username) {
      const userid = await rbx.getIdFromUsername(Username);
        rbx.getIdFromUsername(Username.toLowerCase()).then(id => {
          if (userid) {
            rbx.getRankNameInGroup({group: 3196894, userId: id}).then(Rank => {
            if (Rank != null && Rank - 1 != 0) {
              rbx.setRank({group: process.env.GROUP_ID, target: id, name: Rank}).then(() => {
                rbx.follow({userId: id}).catch(e=> {msg.reply(e)}); 
                rbx.message({ recipient: id, subject: 'Park Inn Ranking', body: 'You have been fired in Park Inn by ' + msg.member.displayName + ' to ' + Rank + '.\nIf you believe this is an error, feel free to contact an SHR about this.' }).then(() => {
                  rbx.getRankNameInGroup(process.env.GROUP_ID, id).then(rankBefore1 => {
                    var rankBefore = rankBefore1;
                  });
                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully ranked!');
                  MessageManage(Moderator, 0XFFFC56, 'User has been ranked through Discord.\n\nModerator: `' + Moderator.tag + '`\nROBLOX User: `' + Username + '\nRanked To: `' + Rank);
                  }).catch(e => {
                  MessageEmbed(Moderator, 0XFFFC56, 'User has been successfully ranked, but unable to be messaged.');
                  MessageManage(Moderator, 0XFFFC56, 'User has been ranked through Discord.\n\nModerator: `' + Moderator.tag + '`\nROBLOX User: `' + Username + '\nRanked To: ' + Rank);
                });
              }).catch(e => {
                MessageEmbed(Moderator, 0XFF5151, 'Please make sure the user is able to change the mentioned users rank, that the user is in the group, or the rank is spelled exactly!');
              });
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'ROBLOX user is not in the group or is Hotel Guest!\n\nUsage: `restorerank <ROBLOX user>`')
            };
          });
        } else {
          MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `restorerank <ROBLOX user>`');
        };
      }).catch(e => MessageEmbed(Moderator, 0XFF5151, 'Error grabbing user ID.\n\n' + e));
  };

    function MessageEmbed(Mod1, Color, Description) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
            .setColor(Color)
            .setDescription(Description);
        msg.channel.send({ embed });
    };
    function MessageManage(Mod1, Color, Description) {
        var embed = new Discord.MessageEmbed()
            .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
            .setColor(Color)
            .setDescription(Description);
        msg.guild.channels.find('name', 'ranking-logs').send({ embed });
    }; 
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: ['rm'],
    permLevel: "User"
};

exports.help = {
    name: "restorerank",
    description: "restores rank",
    usage: "restorerank (name)",
  category: "Roblox"
};