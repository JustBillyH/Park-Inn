const sql = require('sqlite');
const Discord = require('discord.js');

exports.run = async (client, message, [User, ...Reason], level) => {
    const msg = message;
    var Moderator = msg.author;
    Reason = Reason.join(" ");
    var NumPoss = ['1', '2', '3', '4', '5', '6', '7', '8', '9']; // poor 0, 0 cant be the start of a user id, :shrug:
    sql.open('./ModStore.sqlite');

    if (User) {
        if (User.startsWith('<@')) {
            if (msg.mentions.users.first().id != client.user.id) {
                if (msg.guild.members.has(msg.mentions.users.first().id)) {
                    User = await msg.guild.members.fetch(msg.mentions.users.first().id);
                    if (msg.mentions.users.first().id != Moderator.id) {
                          if(msg.mentions.members.first().roles.highest.position < msg.member.roles.highest.position) {
                            if (msg.mentions.members.first().kickable) {
                            if (Reason.length >= 1) {
                              sql.run('SELECT CaseID FROM ModStore WHERE TrackSystem = 0').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User.user.id, CaseID + 1, Reason, 'Kick', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(msg.mentions.members.first().id).user.send('You have been kicked from the Nova Hotels discord by ' + Moderator + ' for ' + Reason);
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully kicked!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason + '`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(msg.mentions.members.first().id).kick('Kicked by ' + Moderator.tag + ' for ' + Reason);
                                });
                              });
                            } else {
                              sql.run('SELECT CaseID FROM ModStore WHERE TrackSystem = 0').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User.user.id, CaseID + 1, '???', 'Kick', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(msg.mentions.members.first().id).user.send('You have been kicked from the Nova Hotels discord by ' + Moderator + ' with no reason provded.');
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully kicked!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(msg.mentions.members.first().id).kick('Kicked by ' + Moderator.tag + ' for ???.');
                                });
                              });
                            };
                          } else {
                            MessageEmbed(Moderator, 0XFF5151, 'User is not kickable.\n\nUsage: `kick <user> [reason]`');
                          };
                        } else {
                          MessageEmbed(Moderator, 0XFF5151, 'You cannot kick a user that has a equal or higher role than you.\n\nUsage: `kick <user> [reason]`');
                        };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot kick yourself.\n\nUsage: `kick <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `kick <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'You cannot kick me.\n\nUsage: `kick <user> [reason]`');
            };
        } else if (!isNaN(parseInt(User))) {
            if (msg.guild.members.has(User)) {
                User = await msg.guild.members.fetch(User);
                if (User != client.user.id) {
                    if (User != Moderator.id) {
                      if(!msg.guild.members.get(User.id).roles.highest.position < msg.member.roles.highest.position) {
                        if (msg.guild.members.get(User).kickable) {
                            if (Reason.length >= 1) {
                              sql.run('SELECT CaseID FROM ModStore WHERE TrackSystem = 0').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User, CaseID + 1, Reason, 'Kick', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(User).user.send('You have been kicked from the Nova Hotels discord by ' + Moderator + ' for ' + Reason);
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully kicked!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason + '`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(User).kick('Kicked by ' + Moderator.tag + ' for ' + Reason);
                                });
                              });
                            } else {
                              sql.run('SELECT CaseID FROM ModStore WHERE TrackSystem = 0').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User, CaseID + 1, '???', 'Kick', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(User).user.send('You have been kicked from the Nova Hotels discord by ' + Moderator + ' with no reason provided.');
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully kicked!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(User).kick('Kicked by ' + Moderator.tag + ' for ???.');
                                });
                              });
                            };
                          } else {
                            MessageEmbed(Moderator, 0XFF5151, 'User is not kickable.\n\nUsage: `kick <user> [reason]`');
                          };
                        } else {
                          MessageEmbed(Moderator, 0XFF5151, 'You cannot kick a user that has a equal or higher role than you.\n\nUsage: `kick <user> [reason]`');
                        };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot kick yourself.\n\nUsage: `kick <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'You cannot kick me.\n\nUsage: `kick <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `kick <user> [reason]`');
            };
        } else {
          MessageEmbed(Moderator, 0XFF5151, 'Please mention a user or provide the ID of the user.\n\nUsage: `kick <user> [reason]`');
        };
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `kick <user> [reason]`');
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
    permLevel: "Discord Moderator"
};

exports.help = {
    name: "kick",
    category: "Moderation",
    description: "Kicks the specified user.",
    usage: "kick <user/id> [reason]"
};