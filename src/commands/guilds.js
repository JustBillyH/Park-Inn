module.exports.run = (client, message, args) => {
    // Lets define our array of guilds
    const guildArray = client.guilds.map((guild) => {
    return `${guild.name} : ${guild.id}`
    })
  
    // And send it
    message.channel.send(`\`\`\`${guildArray.join("\n")}\`\`\``)
  }

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'guilds',
  category: 'Misc',
  description: 'Adds the role to mentioned user.',
  usage: 'guilds'
};