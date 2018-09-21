const Discord = require('discord.js');
const sql = require('sqlite');

sql.open('./././ModStore.sqlite');

exports.run = async (client, message, [User, ...Reason], level) => {
    const msg = message;
    var Moderator = msg.author;
    const Reason1 = Reason.join(" ");
    var NumPoss = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // poor 0, 0 cant be the start of a user id, :shrug:
    var CaseID = `${NumPoss[Math.floor(Math.random() * NumPoss.length)]}${NumPoss[Math.floor(Math.random() * NumPoss.length)]}${NumPoss[Math.floor(Math.random() * NumPoss.length)]}${NumPoss[Math.floor(Math.random() * NumPoss.length)]}${NumPoss[Math.floor(Math.random() * NumPoss.length)]}`;

    if (User) {
        if (User.startsWith('<@')) {
            if (msg.mentions.users.first().id != client.user.id) {
                if (msg.guild.members.has(msg.mentions.users.first().id)) {
                    User = await msg.guild.members.fetch(msg.mentions.users.first().id);
                    if (msg.mentions.users.first().id != Moderator.id) {
                      if(msg.mentions.members.first().roles.highest.position < msg.member.roles.highest.position) {
                        if (Reason.length >= 1) {
                          MessageEmbed(Moderator, 0X42F47A, 'User has been successfully warned!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason1 + '`\nCase #: `' + Math.floor(Math.random() * 100000) + '`')
                        } else {
                          MessageEmbed(Moderator, 0X42F47A, 'User has been successfully warned!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + Math.floor(Math.random() * 100000) + '`');
                        };
                      } else {
                        MessageEmbed(Moderator, 0XFF5151, 'You cannot warn a member with a role equal to or higher than your highest role.\n\nUsage: `warn <user> [reason]`');
                      };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot warn yourself.\n\nUsage: `warn <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `warn <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'You cannot warn me.\n\nUsage: `warn <user> [reason]`');
            };
        } else if (!isNaN(parseInt(User))) {
            if (msg.guild.members.has(User)) {
                User = await msg.guild.members.fetch(User);
                if (User.id != client.user.id) {
                    if (User.id != Moderator.id) {
                      if(!msg.guild.members.get(User.id).roles.highest.position < msg.member.roles.highest.position) {
                        if (Reason.length >= 1) {
                          MessageEmbed(Moderator, 0X42F47A, 'User has been successfully warned!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason1 + '`\nCase #: `' + Math.floor(Math.random() * 100000) + '`');
                        } else {
                          MessageEmbed(Moderator, 0X42F47A, 'User has been successfully warned!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + Math.floor(Math.random() * 100000) + '`');
                        };
                      } else {
                        MessageEmbed(Moderator, 0XFF5151, 'You cannot warn a member with a role equal to or higher than your highest role.\n\nUsage: `warn <user> [reason]`');
                      };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot warn yourself.\n\nUsage: `warn <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'You cannot warn me.\n\nUsage: `warn <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `warn <user> [reason]`');
            };
        } else {
          MessageEmbed(Moderator, 0XFF5151, 'Provide the mention/id of the user.\n\nUsage: `warn <user> [reason]`');
        };
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `warn <user> [reason]`');
    };
  
function MessageEmbed(Mod1,Color,Description) {
  var embed = new Discord.MessageEmbed()
      .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
      .setColor(Color)
      .setDescription(Description);
  msg.channel.send({ embed });
};

function MessageE(Mod1,Color,Description) {
  var embed = new Discord.MessageEmbed()
      .setAuthor(Mod1.tag, Mod1.displayAvatarURL())
      .setColor(Color)
      .setDescription(Description);
msg.guild.channels.find('name', 'ranking-logs')
  msg.channel.send({ embed });
};
  
};

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "Discord Moderator"
};

exports.help = {
    name: "warn",
    category: "Moderation",
    description: "Warns the specified user.",
    usage: "warn <user/id> [reason]"
};