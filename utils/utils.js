const { evaluate } = require("mathjs")
const random = require('random-number');
const NumberSystem = require('number-system');

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
  try {
    return evaluate(exp)
  } catch (error) {
    return 'Error'
  }
}

module.exports.convert = convert 
module.exports.calculate = calculate 
module.exports.separate = separate 
module.exports.random = getRandom 