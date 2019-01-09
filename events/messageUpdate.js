exports.run = (sql, client, oldMessage, newMessage) => {

    if(oldMessage.content === newMessage.content) return;

    try{
        var guildID = oldMessage.guild.id;
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return;
    
            if(row.enabled === "yes" && row.logMessages === "yes" && oldMessage.author.bot === false){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n+Message Updated in " + oldMessage.channel.name + ':\n' + `${oldMessage.author.tag}: ${oldMessage.content} => ${newMessage.content}` + "\nMessage ID: " + oldMessage.id + "\n```")
            }
    
        });

}