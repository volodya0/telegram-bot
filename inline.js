function inlineHandler(ctx){
    
  const query = ctx.inlineQuery
  
    let results = items.map((item) => ({
      type: 'article',
      id: item.id, 
      title: item.title,
      description: item.desc,
      input_message_content: {
        message_text: '*'+item.title+'*\n'+item.desc,
        parse_mode: 'Markdown'
      },
    }))
    ctx.answerInlineQuery(results)
}

module.exports.inlineHandler = inlineHandler