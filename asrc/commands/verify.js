const rbx = require('roblox-js');
const Discord = require('discord.js');
const sql = require('sqlite');


exports.run = async (client, message, username, level) => {
  const msg = message;
  msg.reply('ran')
  const creator = msg.author;
  sql.open('./verifiedUsers.sqlite');
  msg.reply('Opened!')
  username = username.join(' ');
  function makeid() {
    var text = "";
    var selectFruit = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😲','😝','🤑','🤯','😭','😑','😶','😋','🙆','👉','👇','🧠','💼','👮🏻','👍🏼','👎🏼','🐵','🌨','☁️','💧','🎬','🎧','🎮','🎲','🏅','🥇','🥈','🥉','🏆','🏒','🍎','🍫','🍿','🍪','🥛','🍽','🍴','🐑','🦀','🐔','🐭','🦊','🐧','🐞','🌍','🌏','🌕','🌖','🌚','🌝','🌵','🎄','🌲','☀️','⛅️','☔️','🍋'];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    text += selectFruit[Math.floor(Math.random() * selectFruit.length)];
    return text;
    
  }
  msg.reply('past the func')
  sql.get(`SELECT * FROM verifiedUsers WHERE discID="${message.author.id}"`).then(row => {
    msg.reply('Got verified users!')
  var verified = false;//set this coolnicky pls
    if (verified == false) {
      msg.reply('noverify')
      if(username.length <= 1) {
        msg.reply('nouser')
        msg.channel.send('Please have your username in the command!')
      } else {
        console.log('user')
            try {
              console.log('looking for name')
                rbx.getIdFromUsername(username).then(rblxid => {
                  console.log('username')
                if (rblxid) {
                  console.log('generating')
                  const newstring =  makeid() + makeid() + makeid() 
                      console.log('Please put this as your status. Type !approve whenever you are done. You have 5 minutes. ```' + newstring + '```').catch(console.error).then(awa => {
                      message.channel.awaitMessages(m => {m.content.startsWith("!approve") && m.author.id == creator.id}, {max: 1, time: 300000}).then(ahh => {
                        console.log('got')
                      rbx.getStatus(rblxid).then(status => {
                        console.log(status)
                      rbx.getBlurb(rblxid).then(blurb => {
                        console.log(blurb)
                        try {
                          message.channel.send('Checking for code...')
                          if (status.includes(newstring) || blurb.includes(newstring)) {
                            var settings = client.settings.get(msg.guild.id)
                            if(msg.guild.roles.exists('name', settings.VerifiedRole)) {
                              msg.guild.member(msg.author).roles.add(msg.guild.roles.find('name', settings.VerifiedRole), 'Verification Successful.');
                              sql.run('INSERT INTO verifiedUsers (discID, rblxID) VALUES (?, ?)', [creator.id, rblxid]);
                              message.channel.send('Role Given! You can now remove the emojis.')
                            } else {
                              msg.guild.roles.create({data:{name:'Verified'}, reason:'There was no `Verified` role setup, so the `Verified` role has been created and set as the default role.'});
                              msg.channel.send('There was no `Verified` role setup, so the `Verified` role has been created and set as the default role.');
                              settings.set(msg.guild.id, 'Verified');
                              msg.guild.member(msg.author).roles.add(msg.guild.roles.find('name', settings.VerifiedRole), 'Verification Successful.');
                              sql.run('INSERT INTO verifiedUsers (discID, rblxID) VALUES (?, ?)', [creator.id, rblxid]);
                            }
                          } else {
                            msg.channel.send('Please make sure your ROBLOX status/blurb has the key! Please re-verify.')
                          }
                        } catch(e) {
                          msg.channel.send('There has been an error with the command! ' + e)
                        };
                      });
                    });
                  });
                });
              } else {
                msg.channel.send('Please provide a valid user!') ;
              };
            }).catch(console.error) 
          } catch(e) {
            console.log(e)
            msg.channel.send('There has been an error with the command! ' + e);
          };
        };
      } else {
        try {
          var settings = client.settings.get(msg.guild.id);
          if(msg.guild.roles.exists('name', settings.VerifiedRole)) {
            msg.guild.member(msg.author).roles.add(msg.guild.roles.find('name', settings.VerifiedRole), 'Verification Successful.');
          } else {
            msg.channel.reply('There was no `Verified` role setup, so the `Verified` role has been created and set as the default role.');
            msg.guild.roles.create({data:{name:'Verified'}, reason:'There was no `Verified` role setup, so the `Verified` role has been created and set as the default role.'});
            settings.set(msg.guild.id, 'Verified');
            msg.guild.member(msg.author).roles.add(msg.guild.roles.find('name', settings.VerifiedRole), 'Verification Successful.');
          }
        } catch(e) {
          msg.channel.send('There has been an error with the command!' + e);
        };
      };
    }).catch(() => {
      sql.run('CREATE TABLE IF NOT EXISTS verifiedUsers (discID TEXT, rblxID INTEGER)').then(() => {
      sql.run('INSERT INTO verifiedUsers (discID, rblxID) VALUES (?, ?)', [message.author.id, 0]);
    });
  });
}; 
exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: "User"
};

exports.help = {
  name: 'verify',
  description: 'Verifys',
  usage: 'verify',
  category: "Roblox"
}