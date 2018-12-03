exports.run = async (client, message, args) => {

    m = await message.channel.send("Ping?");
    m.edit(`Pong \`${m.createdTimestamp - message.createdTimestamp}ms\``);

}

exports.conf = {
    DM: true,
    OwnerOnly: false
}