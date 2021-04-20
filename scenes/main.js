const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
const { gitURL, myChatId } = require('../config')

const mainKeyboard = Keyboard.make([
    'Calculator', 'Scales', 'Random', 
    'Currencies', 'Translate',
    'View sources on GitHub' 
  ],{pattern:[3,2,1]}).reply()

const Main = new Scenes.WizardScene('Main',
  (ctx) => {
    ctx.reply('Hello, it`s main section, choose your mode', mainKeyboard);
    ctx.wizard.next(); 
  },
  (ctx) => {
    switch (ctx.message.text) {
      case 'Calculator':
        ctx.scene.enter(ctx.message.text)
      break;
      case 'Scales':
        ctx.scene.enter(ctx.message.text)
      break;
      case 'Random':
        ctx.scene.enter(ctx.message.text)
      break; 
      case 'Currencies':
        ctx.scene.enter(ctx.message.text)
      break;
      case 'Translate':
        ctx.scene.enter(ctx.message.text)
      break;
      case 'View sources on GitHub':
        ctx.reply(gitURL)
      break;
      default:
        ctx.reply('Unknown mode')
      break;
    }
  },  
);    
module.exports.Main = Main