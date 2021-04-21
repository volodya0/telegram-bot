function separateDec(string, count, separator){
  return `Separated ${separate}`
}

function separate(string, count, separator = ' '){
  try {
    return string.split('').reverse().map((item, index) => {
      if(index % +count === 0)
        return item + separator
      return item
    }).reverse().join('') 
  } catch (error) {
    return null
  }
}

module.exports.separate = separate
module.exports.separateDec = separateDec 