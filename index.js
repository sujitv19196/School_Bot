//setup 
const Discord = require("discord.js");
const client = new Discord.Client();
const token = "NzQxMDY4NzE4MDg3MzQwMTQz.XyyMBg.2ch6iDj3LRaXgM1cTyZPQDSkumU";
const prefix = "!"

//setup commands  
const fs = require("fs");   
client.commands = new Discord.Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js")); //only .js files 
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command); //add command to commands collection 
}

client.once("ready", () => {
    console.log("Client Online");
})

client.on("message", message => {
    if (!message.content.startsWith(prefix) || message.author.bot) {return;}

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();
    console.log(command);

    if (command === "ping") {
        client.commands.get("ping").execute(message, args);
    } else if (command === "updateclasslist") {
        if (message.member.hasPermission("ADMINISTRATOR")) {
            client.commands.get("addAllRolesInCSV").execute(message, args);
        }
    }
})

client.login(token);