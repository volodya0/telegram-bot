const { Telegraf, Scenes, session } = require('telegraf')
const { Token } = require('./config')
const { Main } = require('./scenes/main/main')
const { Calculator } = require('./scenes/calculator/calculate')
const { Scales } = require('./scenes/scales/scales')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.launch()