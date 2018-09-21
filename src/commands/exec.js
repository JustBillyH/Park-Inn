const exec = require('child_process').exec;

exports.run = async(client, message, args, level) => {
    if (message.author.id !== "399982462245011456" && message.author.id !== "0") return message.channel.send("Only owners can use this command")
    exec(`${args.join(' ')}`, (error, stdout) => {
      const response = (error || stdout);
      message.channel.send(`Ran: ${args.join(" ")}\n${response}`, {code: "asciidoc", split: "\n"}).catch(console.error);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 11
};

exports.help = {
  name: 'exec',
  description: 'Executes a process command.',
  usage: 'exec',
  category: 'Bot Developers'
};
