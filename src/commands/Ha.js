const rbx = require("roblox-js")


var blacklist = [1, 261]
var evt = rbx.onJoinRequestHandle(18)
evt.on('data', function (request) {
  rbx.getIdFromUsername(request.username).then(function (id) {
    for (var i = 0; i < blacklist.length; i++) {
      if (blacklist[i] === id) {
        evt.emit('handle', request, false);
        return;
      }
    }
    evt.emit('handle', request, true, function () {
      rbx.message(id, 'Welcome to Park Inn', 'Welcome to Park Inn, Any Issues Dm a HR+!');
    });
  });
});

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "Ha",
  category: "Roblox",
  description: "Ha?",
  usage: "Blacklists"
};