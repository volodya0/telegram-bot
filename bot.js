const { Telegraf, Scenes, session } = require('telegraf')
const { Token } = require('./config')
const { Main } = require('./scenes/main')
const { Calculator } = require('./scenes/calculate')
const { Scales } = require('./scenes/scales')
const { Random } = require('./scenes/random')
const { Currencies } = require('./scenes/currencies')
const { Translate } = require('./scenes/translate')

const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales, Random, Currencies, Translate);

bot.on('inline_query', async (ctx) => {
  let items = [
    {
      id:1,
      title:'calculate',
      desc:'none'
    }
  ]

  let results = items.map((item) => ({
    type: 'article',
    id: item.id, 
    title: item.title,
    description: item.desc,
    input_message_content: {
      message_text: '*'+item.title+'*\n'+item.desc,
      parse_mode: 'Markdown'
    },
  }))
  ctx.answerInlineQuery(results)
})


bot.use(session());
bot.use(stage.middleware());
bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.on('message', (ctx) => ctx.scene.enter('Main')) 

bot.launch()  