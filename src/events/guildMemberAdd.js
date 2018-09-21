module.exports = (client, member) => {
  // Load the guild's settings
  const settings = client.settings.get(member.guild.id);
  
  if(member.id == '255643690838654976') return member.kick({reason: 'Please don\'t come back'});
}