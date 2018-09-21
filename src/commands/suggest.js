exports.run = (client, message, args) => {
    if (!args[0]) return;
    if (args[0] === "suggestion") return message.reply("Please give a Suggestion.");
    args = args.join(" ");
    message.reply("Thanks for giving a Suggestion! Your message has been sent to <#467825481408839680> for our developers to review!");
    const content = `**${message.author.username}#${message.author.discriminator}** (${message.author.id}) Reported Suggestion:\n~~--------------------------------~~\n${args}\n~~--------------------------------~~\nOn the server: **${message.guild.name}**\nServer ID: **${message.guild.id}**`;
    client.channels.get('467825481408839680').send(`${content}`)
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'suggest',
  description: 'Suggests something.',
  category: 'Bot Issues',
  usage: 'suggest <suggestion>'
};