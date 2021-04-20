const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
const { convert, separate } = require('../utils/utils')

const scalesKeyboard = Keyboard.make([
    '2 to 8', '10 to 2', '8 to 2', '16 to 2', 
    '2 to 10', '10 to 8', '8 to 10', '16 to 8', 
    '2 to 16', '10 to 16', '8 to 16', '16 to 10', 
    'Back to main'
  ], {columns : 4}).reply()

const paramsKeyboard = Keyboard.make([
  'Change params', 'Back to main'
]).reply()

const separateKeyboard = Keyboard.make([
  'Separate < 3 > ', 'Separate < 4 > ',
  'Change params', 'Back to main'
], {columns:2}).reply()


const all = ['2', '8', '10', '16']
const valid = (a, b) => (a !== b ) && (all.includes(a) && all.includes(b))

const Scales = new Scenes.WizardScene('Scales',

  (ctx) => {
    ctx.reply('Scales mode, choose params', scalesKeyboard);
    return ctx.wizard.next(); 
  },

  (ctx) => {
    if (ctx.message.text === 'Back to main') {
      ctx.scene.enter('Main'); 
    }
    const params = ctx.message.text.split(' ')
    if(!valid(params[0], params[2])){
      ctx.reply('Params not valid')
      ctx.scene.reenter()
    }
    ctx.reply(`Enter number (${params[0]} system)`, paramsKeyboard)
    ctx.session.params = [params[0], params[2]]
    ctx.wizard.next()
  },

  ctx => {

    if(ctx.message.text === 'Change params')
      ctx.scene.enter('Scales')
    else if(ctx.message.text === 'Back to main')
      ctx.scene.enter('Main')
    else if(ctx.message.text.split(' ')[0] === 'Separate')
      ctx.reply(`Separated: ${separate('' + ctx.scene.session.value, ctx.message.text.split(' ')[2])}`, separateKeyboard)
    else{
      const [a, b, num] = [...ctx.session.params, ctx.message.text]
      const res = convert(a, b, num)
      if(res === 'Incorrect value'){
        ctx.reply(`${num} (${a}) :>> Incorrect value`)
      }else{
        ctx.scene.session.value = res
        ctx.reply(res ,separateKeyboard)
      }
    }
  },
);

module.exports.Scales = Scales

