const { CurrenciesAPI, CurrenciesURL } = require('../../config')
const fetch = require('node-fetch');

const all = [
  'USD', 'EUR', 'RUB', 'UAH', 'JPY', 'GBP', 'AMD', 'BYN', 'KGS', 'KZT', 'TJS', 'UZS'
] 


async function getCourse(val){
  try {
    val = val.filter(c => all.includes(c.toUpperCase()))
    let res = await fetch(`${CurrenciesURL}/latest?access_key=${CurrenciesAPI}&symbols=${val}`)
    res = await res.json()
    return res
  } catch (error) {
    return null
  } 
}

async function convertCurrenciesObj(from, to){
  from = from.toUpperCase()
  to = to.toUpperCase()
  res = await getPrice(from, to)
  if(res)
    return {
      from, to,
      price : res,
      convert : (value) => {
        try {
          return res * +value
        } catch (error) {
          return null
        }
      },
      convertDec : (value = 1) => {
        try {
          return `${value} ${from} = ${(+res*+value).toFixed(3)} ${to}`
        } catch (error) {
          return null
        }
      },
      swappedConvertDec : (value = 1) => {
        try {
          return `${value} ${to} = ${((1/+res)*+value).toFixed(3)} ${from}`
        } catch (error) {
          return null
        }
      }
    }
}

async function getPrice(from, to){
  try {
    from = from.toUpperCase()
    to = to.toUpperCase()
    const courses = await getCourse([from, to])
    fromVal = courses.rates[from]
    toVal = courses.rates[to]
    console.log('courses :>> ', courses);
    if(fromVal && toVal){
      return (+toVal/+fromVal)
    }
    return null
  } catch (error) {
    return null
  }
}

module.exports.convertCurrenciesObj = convertCurrenciesObj
