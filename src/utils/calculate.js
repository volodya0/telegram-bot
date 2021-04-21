const { evaluate } = require("mathjs")

function calculateDec(exp){
  const res = calculate(exp)
  if(res || res === 0)
    return `${exp} = ${res}`
  return null
}

function calculate(exp){
    try {
      const expression = (exp + '').replace(/,/g, '.')
      const res = evaluate(expression)
      if(+exp === res)return null
      return res
    } catch (error) {
      return null     
    }
}


module.exports.calculate = calculate 
module.exports.calculateDec = calculateDec 