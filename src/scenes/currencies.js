const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
const { convertCurrenciesObj } = require('../utils/currencies')

const all =[
  'USD', 'EUR', 'RUB', 'UAH', 'JPY', 'GBP', 'AMD', 'BYN', 'KGS', 'KZT', 'TJS', 'UZS'
] 

const valuesKeyboard = Keyboard.make([
  '10','100','1 000','10 000','100 000',
  'Change currencies', 'Swap',
  'Back to main'
], {pattern:[5, 2, 1]}).reply()

const Currencies = new Scenes.WizardScene('Currencies',

  (ctx) => {
    ctx.reply('Courses mode, choose <from> currency', Keyboard.make([...all, 'Back to main'], {pattern: [4, 4, 4, 1]}).reply())
    ctx.wizard.next()
  },

  (ctx) => {
    const from = ctx.message.text.toUpperCase()
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else if (!all.includes(from)) {
      ctx.reply('Unknown value')
      ctx.scene.reenter() 
    }else{
      ctx.reply(`From = ${from}, choose <to> currency`, 
        Keyboard.make([...all.filter(c => c !== from), 'Back to main'], {pattern: [4, 4, 4]}).reply())
      ctx.scene.session.from = from
      ctx.wizard.next()
    } 
  },

  async (ctx) => {
    const to = ctx.message.text
    if(ctx.message.text === 'Back to main'){

      ctx.scene.enter('Main')

    }else if (!all.includes(to)) {  

      ctx.reply('Unknown value')
      ctx.wizard.selectStep(0)  

    }else{

      ctx.reply('Wait, getting data...', Keyboard.reply([' ']))
      const res = await convertCurrenciesObj(ctx.scene.session.from, to, 1)
      if(res){
        ctx.wizard.next()
        ctx.reply(res.convertDec(), valuesKeyboard)
        ctx.scene.session.convert = res.convertDec
        ctx.scene.session.swapped = res.swappedConvertDec
      }else{
        ctx.reply('Error')
        ctx.scene.reenter()
      }
      
    } 
  }, 

  (ctx) => {

    if(ctx.message.text === 'Back to main'){

      ctx.scene.enter('Main')

    }else if(ctx.message.text === 'Change currencies'){

      ctx.scene.reenter()

    }else if(ctx.message.text === 'Swap'){

      const swapped = ctx.scene.session.swapped
      ctx.scene.session.swapped = ctx.scene.session.convert
      ctx.scene.session.convert = swapped
      const sum = ctx.scene.session.sum || 1
      ctx.reply(swapped(sum))

    }else{

      const sum = parseInt((ctx.message.text).split(' ').join(''), 10)
      if(sum){
        ctx.scene.session.sum = sum
        ctx.reply(ctx.scene.session.convert(sum), valuesKeyboard)
      }else{
        ctx.reply('Incorrect value')
      }

    }    
  } 
  
  

);
module.exports.Currencies = Currencies

