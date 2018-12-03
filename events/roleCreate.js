exports.run = (sql, client, role) => {

    try{
        var guildID = role.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logRoles === "yes"){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n+Role Added:\n" + `Color: ${role.color} | Name: ${role.name}`  + "```");
            }
    
        });
   
}