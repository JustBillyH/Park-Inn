const Discord = require('discord.js');
const sql = require('sqlite');

sql.open('./ModStore.sqlite');

exports.run = async (client, message, [User, ...Reason], level) => {
  const msg = message;
  const Moderator = msg.author;
  Reason = Reason.join(' ');
  const settings = client.settings.get(msg.guild.id); // message.settings is a thing but by all means, Im grabbing settings from the client because of the config
  
    if (User) {
        if (User.startsWith('<@')) {
            if (msg.mentions.users.first().id != client.user.id) {
                if (msg.guild.members.has(msg.mentions.users.first().id)) {
                    User = await msg.guild.members.fetch(msg.mentions.users.first().id);
                    if (msg.mentions.users.first().id != Moderator.id) {
                        if (!msg.mentions.members.first().roles.exists('name', settings.muteRole)) {
                          if(msg.mentions.members.first().roles.highest.position < msg.member.roles.highest.position) {
                            if (Reason.length >= 1) {
                              sql.get('SELECT CaseID FROM ModStore').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User.user.id, parseInt(CaseID.value) + 1, Reason, 'Mute', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(msg.mentions.members.first().id).user.send('You have been muted in the Nova Hotels discord by ' + Moderator + ' for ' + Reason);
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully muted!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason + '`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(msg.mentions.members.first().id).roles.add(msg.guild.roles.find('name', settings.muteRole), 'Muted by ' + Moderator.tag + ' for ' + Reason);
                                });
                              });
                            } else {
                              sql.get('SELECT CaseID FROM ModStore').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User.user.id, parseInt(CaseID.value) + 1, '???', 'Mute', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(msg.mentions.members.first().id).user.send('You have been muted in the Nova Hotels discord by ' + Moderator + ' with no reason provided.');
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully muted!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(msg.mentions.members.first().id).roles.add(msg.guild.roles.find('name', settings.muteRole), 'Muted by ' + Moderator.tag + ' for ???.');
                                });
                              });
                            };
                          } else {
                            MessageEmbed(Moderator, 0XFF5151, 'You cannot mute a user that has a equal or higher role than you.\n\nUsage: `mute <user> [reason]`');
                          };
                        } else {
                          MessageEmbed(Moderator, 0XFF5151, 'User already has the `' + settings.muteRole + '` role.\n\nUsage: `mute <user> [reason]`');
                        };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot mute yourself.\n\nUsage: `mute <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `mute <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'You cannot mute me.\n\nUsage: `mute <user> [reason]`');
            };
        } else if (!isNaN(parseInt(User))) {
            if (msg.guild.members.has(User)) {
                User = await msg.guild.members.fetch(User);
                if (User != client.user.id) {
                    if (User != Moderator.id) {
                        if (!msg.guild.members.get(User).roles.exists('name', settings.muteRole)) {
                          if(!msg.guild.members.get(User.id).roles.highest.position < msg.member.roles.highest.position) {
                            if (Reason.length >= 1) {
                              sql.run('SELECT CaseID FROM ModStore').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User, parseInt(CaseID.value) + 1, Reason, 'Mute', message.createdTimestamp]).then(() => {
                                  msg.guild.members.get(User).user.send('You have been muted in the Nova Hotels discord by ' + Moderator + ' for ' + Reason);
                                  MessageEmbed(Moderator, 0X42F47A, 'User has been successfully muted!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `' + Reason + '`\nCase #: `' + CaseID + '`');
                                  msg.guild.members.get(User).roles.add(msg.guild.roles.find('name', settings.muteRole), 'Muted by ' + Moderator.tag + ' for ' + Reason);
                                });
                              });
                            } else {
                              sql.run('SELECT CaseID FROM ModStore').then(CaseID => {
                                sql.run('INSERT INTO ModStore (ModID, UserID, CaseID, Reason, Action, Timestamp) VALUES (?, ?, ?, ?, ?, ?)', [Moderator.id, User, parseInt(CaseID.value) + 1, '???', 'Mute', message.createdTimestamp]).then(() => {
                              msg.guild.members.get(User).user.send('You have been muted in the Nova Hotels discord by ' + Moderator + ' with no reason provided.');
                              MessageEmbed(Moderator, 0X42F47A, 'User has been successfully muted!\n\nModerator: `' + Moderator.tag + '`\nUser: `' + User.user.tag + '`\nReason: `???`\nCase #: `' + CaseID + '`');
                              msg.guild.members.get(User).roles.add(msg.guild.roles.find('name', settings.muteRole), 'Muted by ' + Moderator.tag + ' for ???.');
                                });
                              });
                            };
                          } else {
                            MessageEmbed(Moderator, 0XFF5151, 'You cannot mute a user that has a equal or higher role than you.\n\nUsage: `mute <user> [reason]`');
                          };
                        } else {
                          MessageEmbed(Moderator, 0XFF5151, 'User already has the `' + settings.muteRole + '` role.\n\nUsage: `mute <user> [reason]`');
                        };
                    } else {
                      MessageEmbed(Moderator, 0XFF5151, 'You cannot mute yourself.\n\nUsage: `mute <user> [reason]`');
                    };
                } else {
                  MessageEmbed(Moderator, 0XFF5151, 'You cannot mute me.\n\nUsage: `mute <user> [reason]`');
                };
            } else {
              MessageEmbed(Moderator, 0XFF5151, 'User is not in the guild.\n\nUsage: `mute <user> [reason]`');
            };
        } else {
          MessageEmbed(Moderator, 0XFF5151, 'Please mention a user or provide the ID of the user.\n\nUsage: `mute <user> [reason]`');
        };
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Invalid Arguments Provided.\n\nUsage: `mute <user> [reason]`');
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
  name: "mute",
  category: "Moderation",
  description: "Mutes the specified player.",
  usage: "mute <user> [reason]"
};