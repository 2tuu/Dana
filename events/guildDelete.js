const fs = require('fs');
let config = JSON.parse(fs.readFileSync("./config.json", "utf8"));

exports.run = (client, guild) => {
    const logChannel = client.channels.find('id', config.logChannel);
    console.log(">>>Guild Left: " + guild.name + " (" + guild.id + ")");
    logChannel.send("```diff\n>>>Guild Left: " + guild.name + " (" + guild.id + ")\n->>>" + client.guilds.size + " Servers\n```");
}