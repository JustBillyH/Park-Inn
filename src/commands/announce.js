exports.run = (Discord, client, message, args) => {
 
		   const color = args[0]
		   let title = args[0];
		   const text = args.slice(1).join(" ");
		   const author = message.author;
		   if (text.length < 1) return message.channel.send("Can not announce nothing");
		   //const colour = args.slice(2).join("");
		   const embed = new Discord.MessageEmbed()
		   .setColor(message.guild.me.displayHexColor)
		   .setThumbnail(message.guild.iconURL)
		   .setDescription("**Announced by: " + message.author + "**\n\n" + text + "\n")
		   .setFooter("An announcment made at ")
		   .setTimestamp()
      (message.channel, embed)
     
}


exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "Park HR"
};

exports.help = {
  name: 'announce',
  category: "System",
  description: 'Announces?',
  usage: 'announce [TEXT]'
};
