const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {



    let google = args.slice(0).join('+');

        let link = `https://www.google.com/search?q=` + google;
        if(!link)return message.reply("Console error")
        let embed = new Discord.MessageEmbed()
	
    .setColor("RED")
    .setTimestamp()
    .addField('Action:', 'Searching on Google')
	.addField("Word:", `${args.slice(0).join(' ')}`)
	.addField('Link:', `${link}`)
	.setFooter("You're avatar", message.author.avatarURL);
          
	message.channel.send(embed);
	message.author.send(`You have searched for ${link} in ${ message.guild.name}`);
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: "google",
  category: "Misc",
  description: "Googles?",
  usage: "Google (smth)"
};