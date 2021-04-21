const stringifyObject = require('stringify-object');
const { myChatId } = require("../config")

function logger(ctx, next){
  const pretty = stringifyObject(ctx.update, {
      indent: '  ',
      singleQuotes: false
  });
  ctx.telegram.sendMessage(myChatId, pretty)
  next() 
}

module.exports.logger = logger