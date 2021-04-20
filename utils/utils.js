const { evaluate, e } = require("mathjs")
const random = require('random-number');
const NumberSystem = require('number-system');

const isBin = (a) => /\b[0-1]+\b/.test(a+'')
const isOct = (a) => /\b[0-7]+\b/.test(a+'')
const isDec = (a) => /\b[0-9]+\b/.test(a+'')
const isHex = (a) => /\b[0-9,A-F,a-f]+\b/.test(a+'')


function convert(from, to, number){
  try {
    if(from === 'any'){
      let array = []
      if(isBin(number))
        array.push(scales(2, 10, number),scales(2, 8, number),scales(2, 16, number))
      if(isOct(number))
        array.push(scales(8, 2, number),scales(8, 10, number),scales(8, 16, number))  
      if(isDec(number))
        array.push(scales(10, 2, number),scales(10, 8, number),scales(10, 16, number))     
      if(isHex(number))
        array.push(scales(16, 2,  number),scales(16, 8, number),scales(16, 10, number)) 
      return array 
    }
    if(to === 'any'){
      let toV = ['2', '8', '10', '16'].filter(s => s !== from)
      return [
        scales(from, toV[0], number),
        scales(from, toV[1], number),
        scales(from, toV[2], number)
      ]
    }
    return scales(from, to, number)
  } catch (error) {
    return 'Incorrect params'
  }
  
 
  function scales(from, to, number){  
      let result
      number = number + ''
      const ns = new NumberSystem(+from)
      switch (to+'') {
        case '2':
          result = ns.bin(number)
          break;
        case '8':
          result = ns.oct(number)
          if((result.split('')[0] === '0')&&(result.length > 1))
            result = result.slice(1, result.length)
          break;
        case '10':
          result = ns.dec(number)
          break;
        case '16':
          const rez = ns.hex(number)
          if (rez.slice(0, 2) === '0x')
            result = rez.slice(2, rez.length).toUpperCase()
          else
            result = rez
          break;
        default:
          return 'Incorrect params';
      } 
      return `${number} (${from}) = ${result} (${to})`
  }
}


function separate(string, count, separator = ' '){
  return string.split('').reverse().map((item, index) => {
    if(index % +count === 0)
      return item + separator
    return item
  }).reverse().join('')
}

function getRandom(min, max, integer = true){
  if(!max)
    return random({min : 0, max : min, integer })
  
  return random({min, max, integer})
}

function calculate(exp){
  let rez
    try {
      const expression = (exp + '').replace(/,/g, '.')
      rez = `${expression} = ${evaluate(expression)}`
    } catch (error) {
      rez = 'Incorrect expression'     
    }
  return rez
}

module.exports.convert = convert 
module.exports.calculate = calculate 
module.exports.separate = separate 
module.exports.random = getRandom 