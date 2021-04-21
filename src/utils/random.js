const random = require('random-number');

function randomDec(params){
  if(params.length > 2)return null
  const [a, b] = params
  let min = 0, max = 1
  if(!b)
    [min, max] = [0, a]
  if(a && b){
    min = Math.min(+a,+b)
    max = Math.max(+a,+b)
  } 
  const res = getRandom(min, max)
  if(res || res === 0)
    return `Random [${min}..${max}] = ${res}`
  return null
}

function getRandom(min, max){
  try {
    min = +min
    max = +max 
    if(((!min) && min !== 0)||((!min) && min !== 0)||(min === max))return null
    return random({min, max, integer:true})
  } catch (error) {
    return null
  }
}

module.exports.random = getRandom
module.exports.randomDec = randomDec