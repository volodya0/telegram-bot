const { Scenes } = require('telegraf')
const NumberSystem = require('number-system');
const { Keyboard } = require('telegram-keyboard')
const backKeyboard = require('../backKeyboard');
const { re } = require('mathjs');

const scalesKeyboard = Keyboard.make([
    '2 to 8', '10 to 2', '8 to 2', '16 to 2', 
    '2 to 10', '10 to 8', '8 to 10', '16 to 8', 
    '2 to 16', '10 to 16', '8 to 16', '16 to 10', 
    'Back to main'
  ], {columns : 4}).reply()

const paramsKeyboard = Keyboard.make([
  'Change params', 'Back to main'
]).reply()



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
      ctx.wizard.selectStep(0)
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
    else{

      const [a, b, num] = [...ctx.session.params, ctx.message.text]
      const rez = convert(a, b, num)
      if(rez === 'Incorrect value')
        ctx.reply(`${num} (${a}) :>> Incorrect value`)
      else
        ctx.reply(`${num} (${a}) = ${rez} (${b})`)
      ctx.wizard.selectStep(2)

    }
  },
);

module.exports.Scales = Scales

function convert(from, to, number){ 
  try {
    number = number + ''
    const ns = new NumberSystem(+from)
    switch (to) {
      case '2':
        return ns.bin(number)
      case '8':
        return ns.oct(number)
      case '10':
        return ns.dec(number)
      case '16':
        const rez = ns.hex(number)
        if (rez.slice(0, 2) === '0x')
          return rez.slice(2, rez.length).toUpperCase()
        return rez
      default:
        return 'Incorrect value';
    }
  } catch (error) {
    return 'Incorrect value'
  }
}