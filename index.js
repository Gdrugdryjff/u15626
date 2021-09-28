const Discord = require("discord.js")
const client = new Discord.Client()
const commands = require("./commands.json")
const keyv = require("keyv")
const db = require("./account.json")
const fs = require("fs")

client.on("message", message => {
    if(message.content === commands.account) {
        message.channel.send("Scrivi qui sotto l'email dell'account, hai 60 secondi").then(() => {
            message.channel.awaitMessages(m => m.author.id == message.author.id,
                {max: 1, time: 60000}).then(collected => {  
                var email = collected.first().content;
                message.channel.send("Ora inserisci la password").then(() => {
                    message.channel.send("Account aggiunto correttamente!")
                    message.channel.awaitMessages(m => m.author.id == message.author.id,
                        {max: 1, time: 60000}).then(async collected => {  
                        var password = collected.first().content;
                        message.channel.send("Per ultima cosa, inserisci il tipo di account da aggiungere").then(() => {
                            message.channel.send("Account aggiunto correttamente!")
                            message.channel.awaitMessages(m => m.author.id == message.author.id,
                                {max: 1, time: 60000}).then(async collected => {  
                                var accountType = collected.first().content;
                                db[accountType] = {
                                    account = {
                                        email: email,
                                        password: password
                                    }
                                }
                                fs.writeFile("./account.json", JSON.stringify(db), function(err) {
                                    if(err) console.log(err)
                                })
                                message.channel.send("Account aggiunto correttamente!")
                                }).catch(err => {
                                        message.reply('Nessuna risposta, esecuzione comando interrotta.');
                                        message.reply("Errore: " + err)
                                });
                        })
                        }).catch(err => {
                                message.reply('Nessuna risposta, esecuzione comando interrotta.');
                                message.reply("Errore: " + err)
                        });
                })
                }).catch(err => {
                        message.reply('Nessuna risposta, esecuzione comando interrotta.');
                        console.log(err)
                });
        })
    }
    if(message.content.startsWith(commands.get)) {
        let account = message.content.substring(8, 2000)
        if(db[account]) {
            let accountembed = new Discord.MessageEmbed()
            .setTitle("Account generato")
            .setColor("GREEN")
            .addField("Email:", db[account].account.email)
            .addField("Password:", db[account].account.password)
            message.author.send(accountembed)
        } else {
            message.channel.send("Questo tipo di account non esiste!")
        }
    }
})

client.login("")