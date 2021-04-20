const { Scenes } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')
const { calculate } = require('../utils/utils')

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
      let rez
      try {
        let exp = (ctx.message.text + '').replace(/,/g, '.')
        rez = `${exp} = ${calculate(exp)}`
      } catch (error) {
        rez = 'Incorrect expression'     
      }
      ctx.reply(rez,  backKeyboard)
    }
  },

);
module.exports.Calculator = Calculator