const Discord = require("discord.js")
exports.run = async (client, message, User, level) => {// eslint-disable-line no-unused-vars
  

    const friendly = client.config.permLevels.find(l => l.level === level).name;
    var embed = new Discord.MessageEmbed()
    .setThumbnail(client.user.displayAvatarURL())
    .setAuthor("Park Inn", client.user.displayAvatarURL())
    .setDescription("https://www.roblox.com/groups/group.aspx?gid=2788451")
    .setColor("RANDOM")
    message.channel.send(embed)
  
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "glink",
  description: "glink",
  usage: "glink",
  category: "Roblox"
};