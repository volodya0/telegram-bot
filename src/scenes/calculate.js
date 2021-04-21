const { Scenes } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')
const { calculateDec } = require('../utils/calculate')

const backKeyboard = Keyboard.reply(['Back to main'])

const Calculator = new Scenes.WizardScene('Calculator',

  (ctx) => {
    ctx.reply('Calculate mode, enter expression', backKeyboard);
    return ctx.wizard.next(); 
  },

  (ctx) => {
    if (ctx.message.text === 'Back to main') {
      ctx.scene.enter('Main') 
    }else{
      ctx.reply(calculateDec(ctx.message.text)??'Incorrect expression',  backKeyboard)
    }
  },

);
module.exports.Calculator = Calculator