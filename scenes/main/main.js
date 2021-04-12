const { Scenes } = require('telegraf')
const { Keyboard, Key } = require('telegram-keyboard')

const mainKeyboard = Keyboard.reply(['Calculator', 'Scales'])

const Main = new Scenes.WizardScene('Main',
  (ctx) => {
    ctx.reply('Hello, it`s main section, choose your mode', mainKeyboard);
    return ctx.wizard.next(); 
  },
  (ctx) => {
    switch (ctx.message.text) {
      case 'Calculator':
        ctx.scene.enter(ctx.message.text)
      break;
      case 'Scales':
        ctx.scene.enter(ctx.message.text)
      break;
      default:
        ctx.reply('Unknown mode')
      break;
    }
  },
);
module.exports.Main = Main