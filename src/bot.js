const { Telegraf, Scenes, session} = require('telegraf')
const { Token, myChatId, loggerToken } = require('../config')
const { Main } = require('./scenes/main')
const { Calculator } = require('./scenes/calculate')
const { Scales } = require('./scenes/scales')
const { Random } = require('./scenes/random')
const { Currencies } = require('./scenes/currencies')
const { Translate } = require('./scenes/translate')
const { inlineHandler } = require('./inline')
const { logger, errorLog } = require('./logger')
const { onStart } = require('./utils/translate')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales, Random, Currencies, Translate);

bot.use(logger)
bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.on('inline_query', inlineHandler) 
bot.on('message', (ctx) => ctx.scene.enter('Main')) 

bot.catch(errorLog)
bot.launch()  

//for development  
bot.telegram.sendMessage(myChatId, 'Working...');

