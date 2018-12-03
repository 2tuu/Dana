const Yna = require('ynajs');

exports.read = async (taggerContent, message, args) => {

            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var y = d.getFullYear();
            var s = d.getSeconds();
            var dy = d.getDay();

            //{time.*}
            taggerContent = taggerContent.replace(new RegExp("{time.hour}", 'g'), h);
            taggerContent = taggerContent.replace(new RegExp("{time.minute}", 'g'), m);
            taggerContent = taggerContent.replace(new RegExp("{time.year}", 'g'), y);
            taggerContent = taggerContent.replace(new RegExp("{time.day}", 'g'), dy);

            //{choose:a,b,c,d,e,f}

            //{caller.*}
            taggerContent = taggerContent.replace(new RegExp("{caller}", 'g'), "<@" + message.author.id + ">");           
	        taggerContent = taggerContent.replace(new RegExp("{caller.name}", 'g'), message.author.username);
            taggerContent = taggerContent.replace(new RegExp("{caller.id}", 'g'), message.author.id);
            taggerContent = taggerContent.replace(new RegExp("{caller.icon}", 'g'), message.author.avatarURL);

            //{channel.*}
            taggerContent = taggerContent.replace(new RegExp("{channel.topic}", 'g'), message.channel.topic);
            taggerContent = taggerContent.replace(new RegExp("{channel.name}", 'g'), message.channel.name);
            taggerContent = taggerContent.replace(new RegExp("{channel.id}", 'g'), message.channel.id);
            taggerContent = taggerContent.replace(new RegExp("{channel}", 'g'), "<#" + message.channel.id + ">");

            //{guild.*}
            taggerContent = taggerContent.replace(new RegExp("{guild.id}", 'g'), message.guild.id); 
            taggerContent = taggerContent.replace(new RegExp("{guild.name}", 'g'), message.guild.name);
            taggerContent = taggerContent.replace(new RegExp("{guild.population}", 'g'), message.guild.memberCount);
            taggerContent = taggerContent.replace(new RegExp("{guild.icon}", 'g'), message.guild.iconURL); 
            
            //misc
            taggerContent = taggerContent.replace(new RegExp("{n}", 'g'), "\n");
            taggerContent = taggerContent.replace(new RegExp("{t}", 'g'), "\t");
            taggerContent = taggerContent.replace(new RegExp("{args}", 'g'), args.slice(1).join(' '));
        
            //c-arguments
            var f = 1;
            while(f < 1000){
                var argF;
                
                if(!args[f]){
                   argF = message.author.username;
                } else {
                    argF = args[f];
                }

                taggerContent = taggerContent.replace(new RegExp("{carg" + f + "}", 'g'), argF);
                f = f + 1;
            }

            var tag = new Yna(taggerContent);
            taggerContent = tag.run(args.slice(1));

            return taggerContent;
}

