const { calculateDec } = require('./utils/calculate')
const { randomDec } = require('./utils/random')
const { convert } = require('./utils/scales')
const { translateDec } = require('./utils/translate')

async function inlineHandler(ctx){

  const query = ctx.inlineQuery.query
  const params = query.split(' ')
  const command = params[0]
  const exp = params.slice(1, params.length)
  const results = []

  switch (command) {

    case 'c':
      results.push(calculateDec(exp.join(' ')))      
    break;

    case 'r':
      results.push(randomDec(exp[0], exp[1]))
      break;

    case 's':
      results.push(...convert(exp))
    break;

    case 't':
      results.push(await translateDec(exp))
    break;
  
    default:
      results.push(calculateDec(query))
      results.push(...convert(params))
      results.push(randomDec(params))
    break;
  }
  
  let response
  try {
    response = results
    .filter(res => !!res)
    .map((res, i) => { 
      console.log('res :>> ', res);
      return {
        type: 'article',
        id: i,
        title : res,
        input_message_content:{
          message_text: res
        }
      }
    } )
  } catch (error) {
    console.log('error :>> ', error);
    response = [{
      type: 'article',
      id: 0,
      title : 'Error',
      input_message_content:{
        message_text:'Error' 
      }
    }]
  }
  ctx.answerInlineQuery(response)
}

module.exports.inlineHandler = inlineHandler
