exports.run = (sql, client, message) => {

    try{
        var guildID = message.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logMessages === "yes" && message.author.bot === false){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n-Message Deleted:\n" + `${message.author.tag}: ${message.content}`  + "```");
            }
    
        });

}