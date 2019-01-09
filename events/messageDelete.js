exports.run = async (sql, client, message) => {

    var Attachment = [];

    try{
        var guildID = message.guild.id;
        } catch(err){
            console.error(err);
        }
    
        var row = await sql.get(`SELECT * FROM modlog WHERE serverId ="${guildID}"`);

            if(message.attachments){
            Attachment = message.attachments.array().map(m => m.url);
            Attachment = Attachment.join(', ');
            }
    
            if(!row) return;
    
            if(row.enabled === "yes" && row.logMessages === "yes" && message.author.bot === false){
               var ch = client.guilds.get(guildID).channels.get(row.channel);

               if(Attachment[0]){
                ch.send("```diff\n-Message Deleted in " + message.channel.name + ':\n' + `${message.author.tag}: ${message.content}` + ":\nMessage ID: " + message.id + "\n```\n"+
                        "```diff\n+Attachments:\n" + Attachment + "\n```");

               } else {
               ch.send("```diff\n-Message Deleted in " + message.channel.name + ':\n' + `${message.author.tag}: ${message.content}` + ":\nMessage ID: " + message.id + "\n```");
               }
            }
    

}