const Discord = require('discord.js');
const rbx = require('roblox-js');
const progress = require('progress');

exports.run = async (client, message, [targetUser1, startPage1, endPage1], level) => { 
const msg = message;
var Moderator = msg.author;
var ProgressBar = require('progress');
var username = process.env.BOT_USER;
var password = process.env.BOT_PASSWORD;
var group = process.env.GROUP_ID;

var actionTypeId = 6;
var targetUser = targetUser1;
var startPage = startPage1;
var endPage = endPage1;
var afterDate = new Date('2018-01-01 00:00 CDT');

  if(targetUser) {
    if(startPage && endPage) {
      rbx.login(username, password)
      .then(function () {
        var pages = [];
        for (var i = startPage; i <= endPage; i++) {
          pages.push(i);
        };
        var audit = new ProgressBar('Getting audit log [:bar] :current/:total = :percent :etas remaining ', {total: 10000});
        var promise = rbx.getAuditLog({
          group: group,
          action: actionTypeId,
          username: targetUser,
          page: pages
        });
        promise.then(function (audit) {
          var logs = audit.logs;
          var original = {};
          for (var i = 0; i < logs.length; i++) {
            var log = logs[i];
            if (log.date > afterDate) {
              original[log.action.target] = log.action.params[0];
            };
          };
          var reset = [];
          for (var target in original) {
            reset.push({
              target: target,
              role: original[target]
            });
          };
          rbx.getGeneralToken()
          .then(function () {
            var revert = new ProgressBar('Reverting user ranks [:bar] :current/:total = :percent :etas remaining ', {total: 10000});
            console.time('Time: ');
            var thread = rbx.threaded(function (i) {
              return rbx.setRank({
                group: group,
                target: reset[i].target,
                name: reset[i].role
              });
            }, 0, reset.length);
            var ivl = setInterval(function () {
              revert.update(thread.getStatus() / 100);
            }, 1000);
            thread.then(function () {
              clearInterval(ivl);
              console.timeEnd('Time: ');
            });
          });
        });
        var ivl = setInterval(function () {
          audit.update(promise.getStatus() / 100);
        }, 1000);
        promise.then(function () {
          clearInterval(ivl);
        });
      });
    } else {
      MessageEmbed(Moderator, 0XFF5151, 'Please provide the audit log start and end page!\n\nUsage: `revertrank <ROBLOX name> <Audit Log Start Page> <Audit Log End Page>`');
    };
  } else {
    MessageEmbed(Moderator, 0XFF5151, 'Please provide a ROBLOX user.\n\nUsage: `revertrank <ROBLOX name> <Audit Log Start Page> <Audit Log End Page>`');
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
  permLevel: "Bot Admin"
};

exports.help = {
  name: "revertrank",
  category: "Roblox",
  description: "Reverts the users specified audit log changes.",
  usage: "revertrank <ROBLOX name> <Audit Log Start Page> <Audit Log End Page>"
};