exports.run = (client, message, args) => {
    if (!args[0]) return;
    if (args[0] === "bug") return message.reply("Please give a Bug.");
    args = args.join(" ");
    message.reply("Thanks for reporting a bug! Your message has been sent to <#467825481408839680> for our developers to review!");
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) Reported Bug:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.get('467825481408839680').send(`${content}`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'bug',
  description: 'Suggest the Bug?',
  category: 'Bot Issues',
  usage: 'bug <name>'
};
