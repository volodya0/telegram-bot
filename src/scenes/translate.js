const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard');
const { translateWithDetectDec, translate, LangListDec } = require('../utils/translate');

const backKeyboard = Keyboard.reply(['Back to main'])

const Translate = new Scenes.WizardScene('Translate',

  (ctx) => {
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else{
      ctx.reply('Translate mode not working', Keyboard.reply(['Back to main']));
    }
  },

  // async (ctx) => {
  //   if(ctx.message.text === 'Back to main'){
  //     ctx.scene.enter('Main')
  //   }else if(ctx.message.text === 'show all languages'){
  //     ctx.reply('Wait, getting data...', Keyboard.reply([' ']))
  //     const list = await LangListDec()
  //       if(list){
  //         ctx.reply(list)
  //         ctx.reply('Input target language', backKeyboard)
  //       }else{
  //         ctx.reply('Error')
  //         ctx.scene.reenter()
  //       }
  //     ctx.wizard.selectStep(1)
  //   }else{
  //     ctx.scene.session.to = ctx.message.text
  //     ctx.reply('Input original language', Keyboard.reply(['Use auto-detect',ctx.from.language_code,'show all languages', 'Back to main']))
  //     ctx.wizard.next()
  //   }
  // },

  // async (ctx) => { if(ctx.message.text === 'Back to main'){
  //   ctx.scene.enter('Main')
  // }else if(ctx.message.text === 'show all languages'){
  //   ctx.reply('Wait, getting data...', Keyboard.reply([' ']))
  //   const list = await LangListDec()
  //     if(list){
  //       ctx.reply(list)
  //       ctx.reply('Input target language', backKeyboard)
  //     }else{
  //       ctx.reply('Error')
  //       ctx.scene.reenter()
  //     }
  //   ctx.wizard.selectStep(2)
  // }else if(ctx.message.text === 'Use auto-detect'){
  //   ctx.scene.session.translate = async(text) => {
  //     const res = await translateWithDetectDec(to ,text)
  //     return res
  //   }
  // }else{
  //   ctx.scene.session.translate = async(text) => {
  //     const res = await translate(ctx.message.text ,ctx.message.to ,text)
  //     return res
  //   }
  // }
  //   ctx.reply('Input your text', backKeyboard)
  //   ctx.wizard.next()
  // },

  // async(ctx) => {
  //   if(ctx.message.text === 'Back to main'){
  //     ctx.scene.enter('Main')
  //   }else{
  //     ctx.reply('Translating...', Keyboard.reply([' ']))
  //     const res = await ctx.scene.session.translate(ctx.message.text)
  //     console.log('res :>> ', res);
  //     ctx.reply(res || 'Error', backKeyboard)

  //   }
  // }
);
module.exports.Translate = Translate
