const Discord = require(`discord.js`);

exports.run = async (sql, client, channel) => {

    var channelID = channel.id;
    try{
    var guildID = channel.guild.id;
    } catch(err){
        console.error(err);
    }

    sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {

        if(!row) return;

        if(row.enabled === "yes" && row.logChannels === "yes"){
           var ch = client.guilds.get(guildID).channels.get(row.channel);
            ch.send("```diff\n-Channel Deleted\n" + channel.name + " (" + channel.id + ")\n```")
        }

    });
   
}