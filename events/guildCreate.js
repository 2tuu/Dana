const fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

var blacklist = ['256926147827335170'];

exports.run = (client, guild) => {
    const logChannel = client.channels.find('id', config.logChannel);
    
    if(blacklist.includes(guild.id)){
        logChannel.send("```diff\n>>>Guild Joined: " + guild.name + " (" + guild.id + ")\n+>>>" + client.guilds.size + " Servers\n->>>Guild blacklisted, leaving```");
        guild.leave();
    } else {
        logChannel.send("```diff\n>>>Guild Joined: " + guild.name + " (" + guild.id + ")\n+>>>" + client.guilds.size + " Servers\n```");
    }
   
}
