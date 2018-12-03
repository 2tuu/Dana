const Discord = require("discord.js");

exports.run = (client, message, args, deletedMessage, sql, tossedSet, roles) => {


    var argVar2 = args[0].replace("<@", "").replace("!", "").replace(">", "");
        var  roleVar2 = message.guild.members.find("id", argVar2);

    if(tossedSet.has(roleVar2.id + "-" + message.guild.id)){
    sql.get(`SELECT * FROM settings WHERE serverId ="${message.guild.id}"`).then(row => {
        async function profileA(){
        if (!row) {
            await sql.run("INSERT INTO settings (serverId, banId) VALUES (?, ?)", [message.guild.id, "null"]);
        } 
    }
    
    profileA();

    }).catch(() => {

    });


    async function rolea(){

    if(!message.member.permissions.has('BAN_MEMBERS')) {
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setTimestamp()
        .setTitle("Sorry, you don't have permission to use this. (BAN_MEMBERS Required)")
        message.channel.send({embed});
        
    } else {
        var argVar = args[0].replace("<@", "").replace("!", "").replace(">", "");
        var  roleVar = message.guild.members.find("id", argVar);

        if(!roles[message.guild.id + "-" + argVar]){
            message.channel.send("This member is not rolebanned");
        } else {

        sql.get(`SELECT * FROM settings WHERE serverId ="${message.guild.id}"`).then(row => {

            async function roleb(){
 
            await roleVar.addRoles(roles[message.guild.id + "-" + argVar].roles).then(() => {
                delete roles[message.guild.id + "-" + argVar];
                tossedSet.delete(roleVar.id + "-" + message.guild.id);
                
                const embed = new Discord.RichEmbed()
                        .setDescription("Member's roles have been restored")
                    message.channel.send({embed});
            }).catch((err) => {
                message.channel.send("An error occured while restoring roles: " + err);
            });

            if(roleVar.roles.find("id", row.banId)){
                await roleVar.removeRole(row.banId).catch((err) => {
                    console.error(err);
                });
            }
        }

        roleb();
            //log(row.userID);
        }).catch(() => {
            return console.error("==NON CRITICAL==\n" + err) ;
        });

    }

    }
}

rolea();
    } else {
        const embed = new Discord.RichEmbed()
        .setColor(0xF46242)
        .setDescription("This member is not rolebanned")
        return message.channel.send({embed});
    }
}

exports.conf = {
    DM: true,
    OwnerOnly: false
}