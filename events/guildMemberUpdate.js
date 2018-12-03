const Discord = require(`discord.js`);

exports.run = (sql, client, oldMember, newMember) => {

    try{
        var guildID = oldMember.guild.id;
        console.log(guildID);
        } catch(err){
            console.error(err);
        }
    
        sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`).then(row => {
    
            if(!row) return console.log('no row');
    
            if(row.enabled === "yes" && row.logMembers === "yes"){
               var ch = client.guilds.get(guildID).channels.get(row.channel);
               ch.send("```diff\n+" + oldMember.user.tag + 
               " changed their nickname:\n" + oldMember.nickname + " => " + newMember.nickname + "\n```")
            }
    
        });

}