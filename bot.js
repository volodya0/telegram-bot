const { Telegraf, Scenes, session } = require('telegraf')
const { Token } = require('./config')
const { Main } = require('./scenes/main/main')
const { Calculator } = require('./scenes/calculator/calculate')
const { Scales } = require('./scenes/scales/scales')
const { Random } = require('./scenes/random/random')
const { Currencies } = require('./scenes/currencies/currencies')
const { Translate } = require('./scenes/translate/translate')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales, Random, Currencies, Translate);

bot.use(session());
bot.use(stage.middleware());
bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.launch() 