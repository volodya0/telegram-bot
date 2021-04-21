const { Telegraf, Scenes, session} = require('telegraf')
const { Token, myChatId } = require('../config')
const { Main } = require('./scenes/main')
const { Calculator } = require('./scenes/calculate')
const { Scales } = require('./scenes/scales')
const { Random } = require('./scenes/random')
const { Currencies } = require('./scenes/currencies')
const { Translate } = require('./scenes/translate')
const { inlineHandler } = require('./inline')
const { logger } = require('./logger')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales, Random, Currencies, Translate);

bot.use(logger)
bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.on('inline_query', inlineHandler) 
bot.on('message', (ctx) => ctx.scene.enter('Main')) 

bot.catch((err, ctx) => {
  ctx.telegram.sendMessage(myChatId, err)
  console.log('err :>> ', err);
})
bot.launch()  