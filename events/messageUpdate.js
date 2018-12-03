exports.run = (sql, client, oldMessage, newMessage) => {

    try{
        var guildID = oldMessage.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logMessages === "yes" && oldMessage.author.bot === false){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n+Message Updated:\n" + `${oldMessage.author.tag}: ${oldMessage.content} => ${newMessage.content}`  + "```")
            }
    
        });

}