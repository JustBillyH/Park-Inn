const rbx = require("roblox-js")
let GroupID = 2788451;

rbx.login({username: "ParkManage", password: "ParkPark"}).then((success) => { // Required if the group's shout is private

    let onShout = rbx.onShout(GroupID);
    
    onShout.on('data', function(post) {
        console.log(post.author.username + " shouted: " + post.message);
    });
    
    onShout.on('error', function (err) {
        console.error(err.stack);
    });

    console.log('Logged in.');

}).catch((err) => console.error(err.stack));

exports.conf = {
    enabled: true,
    guildOnly: true,
    aliases: [],
    permLevel: "User"
};

exports.help = {
    name: "onShout",
    description: "onShout",
    usage: "onShout",
    category: "Roblox"
};