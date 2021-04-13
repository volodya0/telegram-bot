const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')

const backKeyboard = Keyboard.reply(['Back to main'])

const Translate = new Scenes.WizardScene('Translate',

  (ctx) => {
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else{
      ctx.reply('Translate mode not working', backKeyboard);
    }
  },

);
module.exports.Translate = Translate
