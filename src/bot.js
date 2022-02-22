require("dotenv").config();

var DELETE_FLAG = false

const {STANDARD_FILTER} = require('./main_filter.js')

const {ADVANCED_FILTER} = require('./advanced_filter.js')

const {CUSTOM_FILTER} = require('./custom_filter.js')

const { Client, DiscordAPIError } = require('discord.js');
const client = new Client();


// logging in bot
client.login(process.env.DISCORDJS_BOT_TOKEN);
client.on('ready', () => {
 console.log(`${client.user.username}` + ' ready @ ' + Date());
});


client.on('message', (msg) => {

  // checking if message is made by bot or if checking is disabled
  if(msg.author.bot) {
    return
  }

  if(process.env.ENABLE_CHECKING == "false") {
    return
  }


  // running filters
  if(process.env.STANDARD_FILTER == "true") {

    let wordArray = msg.content.split(' ')

    for(var i = 0; i < wordArray.length; i++) {
      if(STANDARD_FILTER.has(wordArray[i].toLowerCase())) {
        DELETE_FLAG = true
        console.log(`${msg.author.username} said ` + wordArray[i] + " breaking standard filter @ " + Date());
      }
    }

  }

  if (process.env.ADVANCED_FILTER == "true") {

      let wordArray = msg.content.split(' ')

      for(var i = 0; i < wordArray.length; i++) {
        if(ADVANCED_FILTER.has(wordArray[i].toLowerCase())) {
          DELETE_FLAG = true
          console.log(`${msg.author.username} said ` + wordArray[i] + " breaking advanced filter @ " + Date());
        }
      }
    }

    if (process.env.CUSTOM_FILTER == "true") {

      let wordArray = msg.content.split(' ')

      for(var i = 0; i < wordArray.length; i++) {
        if(CUSTOM_FILTER.has(wordArray[i].toLowerCase())) {
          DELETE_FLAG = true
          console.log(`${msg.author.username} said ` + wordArray[i] + " breaking custom filter @ " + Date());
        }
      }
    }

    if (DELETE_FLAG) {
      msg.delete()
      msg.channel.send(`sorry ${msg.author.username}, this is a christian server, no bad words allowed`)
      DELETE_FLAG = false
    }


}
)