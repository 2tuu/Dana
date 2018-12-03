exports.run = (sql, client, messageReaction, user) => {

    try{
        var guildID = messageReaction.message.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logReactions === "yes"){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n-Reaction Removed:\n" + `User: ${user.tag}\nEmoji: ${messageReaction.emoji.name}\nMessage: \n+${messageReaction.message.author.tag}: ${messageReaction.message.content}`  + "```")
            }
    
        });

}