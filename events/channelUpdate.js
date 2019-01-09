const Discord = require(`discord.js`);

exports.run = async (sql, client, newChannel, oldChannel) => {

    var channel = newChannel;
    try{
    var guildID = channel.guild.id;
    } catch(err){
        console.error(err);
    }

    sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {

        if(!row) return;
        if(newChannel.nsfw === oldChannel.nsfw && newChannel.topic === oldChannel.topic && oldChannel.name === newChannel.name) return;

        if(row.enabled === "yes" && row.logChannels === "yes"){

            if(newChannel.name === oldChannel.name && newChannel.topic === oldChannel.topic && newChannel.parent.name === oldChannel.parent.name){
                return;
            } else {
           var ch = client.guilds.get(guildID).channels.get(row.channel);
            ch.send("```diff\n+Channel Updated``````diff\n" + 
            "-Old Channel:\nName: " + newChannel.name +
            "\nTopic: " + newChannel.topic + 
            "\nNSFW: " + newChannel.nsfw + 
            "\n Category: " + newChannel.parent.name + "\n``````diff\n" + 
            "+New Channel:\nName: " + oldChannel.name +
            "\nTopic: " + oldChannel.topic + 
            "\nNSFW: " + oldChannel.nsfw + 
            "\nCategory: " + oldChannel.parent.name + "\n```\n")
           }
        }

    });
   
}