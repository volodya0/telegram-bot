const { Scenes } = require('telegraf')
const { Keyboard } = require('telegram-keyboard')
const { CurrenciesAPI, CurrenciesURL } = require('../../config')
const fetch = require('node-fetch');
const { typeOf } = require('mathjs');

const all = [
  'USD', 'EUR', 'RUB', 'UAH', 'JPY', 'GBP', 'AMD', 'BYN', 'KGS', 'KZT', 'TJS', 'UZS'
] 

const valuesKeyboard = Keyboard.make([
  '10','100','1 000','10 000','100 000',
  'Change currencies', 'Swap',
  'Back to main'
], {pattern:[5, 2, 1]}).reply()

const Currencies = new Scenes.WizardScene('Currencies',

  (ctx) => {
    ctx.reply('Courses mode, choose <from> currency', Keyboard.make([...all, 'Back to main'], {pattern: [4, 4, 4, 1]}).reply())
    ctx.wizard.next()
  },

  (ctx) => {
    const from = ctx.message.text.toUpperCase()
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else if (!all.includes(from)) {
      ctx.reply('Unknown value')
      ctx.scene.reenter() 
    }else{
      ctx.reply(`From = ${from}, choose <to> currency`, 
        Keyboard.make([...all.filter(c => c !== from)], {pattern: [4, 4, 4]}).reply())
      ctx.scene.session.from = from
      ctx.wizard.next()
    } 
  },

  (ctx) => {
    const to = ctx.message.text
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else if (!all.includes(to)) {  
      ctx.reply('Unknown value')
      ctx.wizard.selectStep(0)  
    }else{
      ctx.reply('Wait, getting data...', Keyboard.reply([' ']))
        fetch(`${CurrenciesURL}/latest?access_key=${CurrenciesAPI}&symbols=${ctx.scene.session.from}`)
        .then(res => res.json())
        .then(from => {
          fetch(`${CurrenciesURL}/latest?access_key=${CurrenciesAPI}&symbols=${to}`)
            .catch(err => {ctx.reply('Error'), ctx.scene.reenter()})
            .then(res => res.json())
            .then(to => {
              const nameFrom = Object.keys(from.rates)[0]
              const priceFrom = Object.values(from.rates)[0]
              const nameTo = Object.keys(to.rates)[0]
              const priceTo = Object.values(to.rates)[0]
              const finalPrice = priceTo / priceFrom
              ctx.scene.session.finalPrice = finalPrice
              ctx.scene.session.nameFrom = nameFrom
              ctx.scene.session.nameTo = nameTo 
              ctx.reply(`1 ${nameFrom} = ${finalPrice.toFixed(3)} ${nameTo}`)
              ctx.reply('Enter your sum...', valuesKeyboard)
              ctx.wizard.next()
            }
          )
        }
      )
    } 
  }, 

  (ctx) => {
    const {nameFrom, nameTo, finalPrice} = ctx.scene.session
    if(ctx.message.text === 'Back to main'){
      ctx.scene.enter('Main')
    }else if(ctx.message.text === 'Change currencies'){
      ctx.scene.reenter()
    }else if(ctx.message.text === 'Swap'){
      ctx.scene.session.nameFrom = nameTo
      ctx.scene.session.nameTo = nameFrom
      ctx.scene.session.finalPrice = 1 / finalPrice
      const sum = ctx.scene.session.sum || 1
      ctx.reply(`${sum} ${nameTo} = ${((1 / finalPrice)*sum).toFixed(3)} ${nameFrom}`)
    }else{
      const sum = parseInt((ctx.message.text).split(' ').join(''), 10)
      if(sum){
        ctx.scene.session.sum = sum
        ctx.reply(`${sum} ${nameFrom} = ${(finalPrice*sum).toFixed(3)} ${nameTo}`, valuesKeyboard)
      }else{
        ctx.reply('Incorrect value')
      }
    }    
  } 
  
  

);
module.exports.Currencies = Currencies

