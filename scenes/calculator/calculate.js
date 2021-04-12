const { Scenes } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')
const { evaluate } = require('mathjs')
const backKeyboard = require('../backKeyboard')

const Calculator = new Scenes.WizardScene('Calculator',

  (ctx) => {
    ctx.reply('Calculate mode');
    ctx.reply('Enter expression', backKeyboard)
    return ctx.wizard.next(); 
  },

  (ctx) => {
    if (ctx.message.text === 'Back to main') {
      ctx.scene.enter('Main'); 
    }else{
      ctx.reply(evaluate(ctx.message.text))
    }
  },

);
module.exports.Calculator = Calculator