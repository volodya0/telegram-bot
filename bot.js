const { Telegraf, Scenes, session } = require('telegraf')
const { Token } = require('./config')
const { Main } = require('./scenes/main')
const { Calculator } = require('./scenes/calculate')
const { Scales } = require('./scenes/scales')
const { Random } = require('./scenes/random')
const { Currencies } = require('./scenes/currencies')
const { Translate } = require('./scenes/translate')
const { calculate, convert } = require('./utils/utils')
// const { inlineHandler } = require('./inline')


const bot = new Telegraf(Token)

const stage = new Scenes.Stage();

stage.register(Calculator, Main, Scales, Random, Currencies, Translate);

bot.use(session());
bot.use(stage.middleware());

bot.command('start', (ctx) => ctx.scene.enter('Main'))

bot.on('inline_query', ctx => {

  const [command, ...params] = ctx.inlineQuery.query.split(' ')
  const results = []

  switch (command) {

    case 'c':
      results.push(calculate(params.join(' ')))      
    break;

    case 's':
      console.log(params);
      switch (params.length) {
        case 1:
          results.push(...convert('any', 'any', params[0]))
        break;
        case 2:
          results.push(...convert(params[1], 'any', params[0])) 
        break;
        case 3:
          results.push(convert(params[1], params[2], params[0]))
        break;
        default:

        break;
      }
    break;
  
    default:
      break;
  }
  

  ctx.answerInlineQuery(results.map((res, i) => {
    return {
      type: 'article',
      id: i,
      title : res || 'Incorrect',
      input_message_content:{
        message_text: res || 'Incorrect'
      }
    }
  } ))

}) 
bot.on('message', (ctx) => ctx.scene.enter('Main')) 

bot.launch()  