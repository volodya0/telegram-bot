const { Telegraf, Scenes, session } = require('telegraf')
const { Token } = require('./config')
const { Main, Calculator } = require('./scenes')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.launch()