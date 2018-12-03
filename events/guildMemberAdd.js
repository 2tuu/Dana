const Discord = require(`discord.js`);

exports.run = (sql, client, member) => {

    try{
        var guildID = member.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logLeaves === "yes"){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n+Member Joined: " + member.user.tag + "\nCurrent Count:" + member.guild.memberCount + "\n```")
            }
    
        });
    
        //console.log(channel.id);
    console.log(">>>User Joined: " + " (" + member.username + ")");
   
}
