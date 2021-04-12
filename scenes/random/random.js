const { Scenes } = require('telegraf')
var random = require('random-number');
const { Keyboard } = require('telegram-keyboard')

const backKeyboard = Keyboard.reply(['Back to main'])
const randomKeyboard = Keyboard.make([
    '1 - 2', '1 - 5', '1 - 6', '1 - 10', '1 - 100',
    'max random',
    'Back to main'
  ],{pattern: [5, 1, 1]}).reply()
const randomRepKeyboard = Keyboard.make([
    '1 - 2', '1 - 5', '1 - 6', '1 - 10', '1 - 100',
    'max random', 'Repeat',
    'Back to main'
  ],{pattern: [5, 2, 1]}).reply()
    

const Random = new Scenes.WizardScene('Random',

  (ctx) => {
    ctx.reply('Random mode, enter any limits ( min max )', randomKeyboard);
    return ctx.wizard.next(); 
  },

  (ctx) => {
    if (ctx.message.text === 'Back to main') {
      ctx.scene.enter('Main') 
    }else{
      let rez, params

      if(ctx.message.text === 'max random'){
        params = [0, 999999999999999]
      }else if(ctx.message.text.split(' ')[0] === 'Repeat'){
        params = [ctx.message.text.split(' ')[2], ctx.message.text.split(' ')[4]]
      }else{
        params =  ctx.message.text.split(' ').filter(c => ![' ', '-'].includes(c))
      }



      try {
        rez = `random [ ${params[0]} ... ${params[1]} ]  = ${getRandom(+params[0], +params[1])}`
      } catch (error) {
        rez = 'Incorrect expression'     
      }
      ctx.reply(rez,  Keyboard.make([
        `Repeat [ ${params[0]} ... ${params[1]} ]`,
        '1 - 2', '1 - 5', '1 - 6', '1 - 10', '1 - 100',
        'max random', 'Back to main'
      ],{pattern: [1, 5, 2]}).reply())
    }
  },

);
module.exports.Random = Random

function getRandom(min, max, integer = true){
  if(!max)
    return random({min : 0, max : min, integer })
  
  return random({min, max, integer})
}