const Discord = require('discord.js');
const Enmap = require('enmap');
const EnmapLevel = require('enmap-level');
const { promisify } = require('util');
const readdir = promisify(require('fs').readdir);
const client = new Discord.Client();
client.on("ready", () => {
  client.user.setPresence({activity: {type: 'WATCHING', name: "Park Inn • !help"}});
})
require('./express');

client.logger = require('./src/util/logger');
client.config = require('./config');
require("./src/modules/functions.js")(client);
client.commands = new Enmap();
client.aliases = new Enmap();
client.settings = new Enmap({provider: new EnmapLevel({name: "settings1"})});



const init = async() => {
  //warnStore.sync();
  
  const cmdFiles = await readdir("./src/commands/");
  client.logger.log(`Loading a total of ${cmdFiles.length} commands.`);
  cmdFiles.forEach(f => {
    if (!f.endsWith(".js")) return;
    const response = client.loadCommand(f);
    if (response) console.log(response);
  });

  // Then we load events, which will include our message and ready event.
  const evtFiles = await readdir("./src/events/");
  client.logger.log(`Loading a total of ${evtFiles.length} events.`);
  evtFiles.forEach(file => {
    const eventName = file.split(".")[0];
    const event = require(`./src/events/${file}`);
    // This line is awesome by the way. Just sayin'.
    client.on(eventName, event.bind(null, client));
    delete require.cache[require.resolve(`./src/events/${file}`)];
  });

  // Generate a cache of client permissions for pretty perms
  client.levelCache = {};
  for (let i = 0; i < client.config.permLevels.length; i++) {
    const thisLevel = client.config.permLevels[i];
    client.levelCache[thisLevel.name] = thisLevel.level;
  }
  
  client.login(process.env.BOT_TOKEN, {fetchAllMembers: true});
};
//Do not Ping me stuff
//Gabe and Me.
  client.on("message", message => {
    if(message.mentions.has('302944645720309770', {ignoreRoles: true, ignoreEveryone: true, ignoreUsers: true}) ) {
      if(client.config.ownerID.some(function(x) {
        return message.author.id == x;
      }) || message.author.bot) return; // over here  oof
      var embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(0XFF5151)
      .setDescription('Do not ping them!');
      message.channel.send(message.author, { embed });
  }
  });

  client.on("message", message => {
    if(message.mentions.has('399982462245011456', {ignoreRoles: true, ignoreEveryone: true, ignoreUsers: true}) ) {
      if(client.config.ownerID.some(function(x) {
        return message.author.id == x;
      }) || message.author.bot) return; // over here  oof
      var embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor(0XFF5151)
      .setDescription('Do not ping them!');
      message.channel.send(message.author, { embed });
  }
  });

//FILTER
client.on('message', message => {
  if (message.content === 'Fuck') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});


client.on('message', message => {
  if (message.content === 'Fuc') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});
//FILTER
client.on('message', message => {
  if (message.content === 'Fucker') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});


client.on('message', message => {
  if (message.content === 'Bastard') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});

//FILTER
client.on('message', message => {
  if (message.content === 'Fuck') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});


client.on('message', message => {
  if (message.content === 'Bitch') {
message.delete(9000)
    const embed = new Discord.MessageEmbed()
      .setTitle(':egg: BAD EGG')
      .setColor(0xFF0000)
      .setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});

client.on('message', message => {
 if (message.content === 'Fucker') {
message.delete(9000)
 const embed = new Discord.MessageEmbed()
.setTitle(':egg: BAD EGG')
.setColour(0xFF0000)
.setDescription(':negative_squared_cross_mark: Please do not swear. If you carry on I will have to take action.')
    message.channel.send(embed);
  }
});
init();