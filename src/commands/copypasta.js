const copypastas = require('.src/commands/copypasta.json')
exports.run = (client, message, args) => {
    args = args.join(" ");
    message.channel.send(`${copypastas[Math.floor(Math.random() * copypastas.length)]}`);
}

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'copypasta',
  category: 'Fun Commands',
  description: 'ends a random copypasta.',
  usage: 'copypasta'
};
