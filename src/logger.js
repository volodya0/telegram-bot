const stringifyObject = require('stringify-object');
const { Telegraf } = require('telegraf');
const { myChatId, loggerToken } = require("../config")

const loggerBot = new Telegraf(loggerToken)

function logger(ctx, next){

  if(loggerIsActive) {
    const pretty = stringifyObject(ctx.update, {
      indent: '  ',
      singleQuotes: false
    });
    
    loggerBot.telegram.sendMessage(myChatId, pretty)
  }
  
  next() 
}

let loggerIsActive = false

function errorLog(err, ctx){
  loggerBot.telegram.sendMessage(myChatId, err)
  console.log('ERROR :>> ', err);
}

loggerBot.on('text', (ctx) => {
  switch (ctx.message.text) {
    case 'start':
      loggerIsActive = true
      ctx.reply('Logger enabled')
      break;
    case 'stop':
      loggerIsActive = false
      ctx.reply('Logger disabled')

      break;
  
    default:
      ctx.reply('LAUNCHED.... ')
      break;
  }
})

loggerBot.launch() 

module.exports.logger = logger
module.exports.errorLog = errorLog