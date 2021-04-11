const { Scenes } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')

const mainKeyboard = Keyboard.reply(['Calculator', 'Button 2'])
const backKeyboard = Keyboard.reply(['Back to main'])

const Main = new Scenes.WizardScene('Main',
  (ctx) => {
    ctx.reply('Hello, it`s main section, choose your mode', mainKeyboard);
    return ctx.wizard.next(); 
  },
  (ctx) => {
    switch (ctx.message.text) {
      case 'Calculator':
        ctx.scene.enter('Calculator')
      break;
    
      default:
        ctx.reply('Unknown mode')
      break;
    }
  },
);
module.exports.Main = Main

const Calculator = new Scenes.WizardScene('Calculator',
  (ctx) => {
    ctx.reply('Calculate mode', backKeyboard);
    return ctx.wizard.next(); 
  },
  (ctx) => {
    if (ctx.message.text === 'Back to main') {
      ctx.scene.enter('Main'); 
    }
    ctx.wizard.next()
  },
);
module.exports.Calculator = Calculator