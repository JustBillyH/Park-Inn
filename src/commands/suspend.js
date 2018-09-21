const Discord = require('discord.js');
const rbx = require('roblox-js');

exports.run = async (client, message, [Username, ...Reason], level) => {
  Reason = Reason.join(' ');  
  const msg = message;
  var Moderator = msg.author;
  rbx.login(process.env.BOT_USER, process.env.BOT_PASSWORD);
  await rbx.login(process.env.BOT_USER, process.env.BOT_PASSWORD);
  
    if (Username) {
      const userid = await rbx.getIdFromUsername(Username);
        if (Reason) {
            rbx.getIdFromUsername(Username.toLowerCase()).then(id => {
                if (userid && Reason) {
                  rbx.getRankInGroup({group: process.env.GROUP_ID, userId: id}).then(Rank => {
                  if (Rank != null && Rank - 1 != 0) {
                    rbx.setRank({group: process.env.GROUP_ID, target: id, name: 'Suspended'}).then(() => {
                        rbx.follow({userId: id}).catch(e=> {msg.reply(e)}); 
                        rbx.message({ recipient: id, subject: 'Park Inn Suspension', body: 'You have been Suspended in Park Inn by ' + msg.member.displayName + ' to ' + Rank + '.\nIf you believe this is an error, feel free to contact an SHR about this.\n This is an Automated Message.' }).then(() => {
                        rbx.getRankNameInGroup(process.env.GROUP_ID, id).then(rankBefore1 => {
                            var rankBefore = rankBefore1;
                        });
                            MessageEmbed(Moderator, 0X42F47A, 'User has been successfully ranked!');
                            MessageManage(Moderator, 0XFFFC56, 'User has been ranked through Discord.\n\nModerator: `' + Moderator.tag + '`\nROBLOX User: `' + Username + '`\nRanked From: `' + Rank + '`\nRanked To: `' + 'Hotel Guest' + '`\nReason: `' + Reason + '`');
                        }).catch(e => {
                            MessageEmbed(Moderator, 0XFFFC56, 'User has been successfully ranked, but unable to be messaged.');
                            MessageManage(Moderator, 0XFFFC56, 'User has been ranked through Discord.\n\nModerator: `' + Moderator.tag + '`\nROBLOX User: `' + Username + '`\nRanked From: `' + Rank + '`\nRanked To: `' + 'Hotel Guest' + '`\nReason: `' + Reason + '`');
                        });
                    }).catch(e => {
                        MessageEmbed(Moderator, 0XFF5151, 'Please make sure the user is able to change the mentioned users rank, that the user is in the group, or the rank is spelled exactly!');
                    });
                  } else {
                    MessageEmbed(Moderator, 0XFF5151, 'ROBLOX user is not in the group or is Resort Guest!\n\nUsage: `suspend <ROBLOX user/id> <reason>`')
                  };
                });
                } else {
                    MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `suspend <ROBLOX user/id> <reason>`');
                };
            }).catch(e => MessageEmbed(Moderator, 0XFF5151, 'Error grabbing user ID.\n\n' + e));
        } else {
            MessageEmbed(Moderator, 0XFF5151, 'Please provide the reason of why you want to suspend the ROBLOX user.\n\nUsage: `suspend <ROBLOX user/id> <reason>`');
        };
    } else {
        MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `suspend <ROBLOX user/id> <reason>`');
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
  aliases: ['sususer','suspend-user'],
  permLevel: "Park HR"
};

exports.help = {
  name: "suspend",
  category: "Roblox",
  description: "Suspends the mentioned ROBLOX user.",
  usage: "suspend <ROBLOX name/id> <reason>"
};