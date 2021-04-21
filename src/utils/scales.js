const NumberSystem = require('number-system');

const isBin = (a) => /\b[0-1]+\b/.test(a+'')
const isOct = (a) => /\b[0-7]+\b/.test(a+'')
const isDec = (a) => /\b[0-9]+\b/.test(a+'')
const isHex = (a) => /\b[0-9,A-F,a-f]+\b/.test(a+'')

function convert(params){
  let number, from, to
  switch (params.length) {
    case 1:
      let array = []
      number = params[0]
      if(isBin(number))
        array.push(scalesDec(2, 10, number),scalesDec(2, 8, number),scalesDec(2, 16, number))
      if(isOct(number))
        array.push(scalesDec(8, 2, number),scalesDec(8, 10, number),scalesDec(8, 16, number))  
      if(isDec(number))
        array.push(scalesDec(10, 2, number),scalesDec(10, 8, number),scalesDec(10, 16, number))     
      if(isHex(number))
        array.push(scalesDec(16, 2,  number),scalesDec(16, 8, number),scalesDec(16, 10, number)) 
      return array 

    case 2:
      number = params[0]
      from = params[1]
      let toV = ['2', '8', '10', '16'].filter(s => s !== from)
      return [
        scalesDec(from, toV[0], number),
        scalesDec(from, toV[1], number),
        scalesDec(from, toV[2], number)
      ]

    case 3:
      return [scalesDec(params[1], params[2], params[0])]

  }
}

function scalesDec(from, to, number){
  const res = scales(from,to,number)
  if(!res && res !== 0)
    return null
  return `${number} (${from}) = ${res} (${to})`
}

function scales(from, to, number){ 
  try {
    let result
    number = number + ''
    const ns = new NumberSystem(+from)
    switch (+to) {

      case 2:
        return ns.bin(number)

      case 8:
        result = ns.oct(number)
        if((result.split('')[0] === '0')&&(result.length > 1))
          return result.slice(1, result.length)
        return result

      case 10:
        return ns.dec(number)

      case 16:
        let res = ns.hex(number)
        if (res.slice(0, 2) === '0x')
          res = res.slice(2, res.length).toUpperCase()
        return res

      default :
        return null
    } 
  } catch (error) {
    return null
  } 
  
}

module.exports.convert = convert 
module.exports.scalesDec = scalesDec 