const fetch = require('node-fetch');
const axios = require('axios').default
const { v4: uuidv4 } = require('uuid');
const { TranslationEndpoint, TranslationKey1, TranslationRegion, TranslationKey2, TranslationBaseURL } = require('../../config');

const languages = [
  'af', 'am', 'ar', 'as', 'az', 'bg', 'bn', 'bs',
  'ca', 'cs', 'cy', 'da', 'de', 'el', 'en', 'es', 
  'et', 'fa', 'fi', 'fj', 'fr', 'ga', 'gu', 'he',
  'hi', 'hr', 'ht', 'hu', 'hy', 'id', 'is', 'it',
  'iu', 'ja', 'kk', 'km', 'kn', 'ko', 'ku', 'lo',
  'lt', 'lv', 'mg', 'mi', 'ml', 'mr', 'ms', 'mt',
  'my', 'nb', 'ne', 'nl', 'or', 'pa', 'pl', 'ps',
  'pt', 'ro', 'ru', 'sk', 'sl', 'sm', 'sq', 'sv',
  'sw', 'ta', 'te', 'th', 'ti', 'to', 'tr', 'ty',
  'uk', 'ur', 'vi'
]

const defaultOptions = {
  baseURL: TranslationBaseURL,
  method: 'post',
  headers: { 
      'Ocp-Apim-Subscription-Key': TranslationKey1,
      'Ocp-Apim-Subscription-Region': TranslationRegion,
      'Content-type': 'application/json',
      'X-ClientTraceId': uuidv4().toString()
  }, 
  responseType: 'json'
}

async function getLanguages(){
  try {
    // let res = await axios('https://api.cognitive.microsofttranslator.com/languages?api-version=3.0')
    // return res.data.translation
    return languages
  } catch (error) {
    return null
  }
}

async function detectLanguage(text){
  try {
    const options = {
      url: '/detect',
      params : {
        'api-version': '3.0',
      },
      data : [{
        'text': text
      }]
    }
  let res =  await axios({...defaultOptions, ...options})
  return res.data
  }catch(error){
    return null
  }  
}

async function translate(from, to, text){
  try {
    const options = {
      url: '/translate',
      params : {
        'api-version': '3.0',
        'from': from,
        'to':  to
      },
      data : [{
        'text': text
      }]
    }
    
    let res =  await axios({...defaultOptions, ...options})
    return res.data[0].translations
  } catch (error) {
    return null
  }
}

async function translateWithDetect(to, text){
  try {
    const options = {
      url: '/translate',
      params : {
        'api-version': '3.0',
        'to':  to
      },
      data : [{
        'text': text
      }]
    }
  
    let res =  await axios({...defaultOptions, ...options})
    return res.data[0]
  } catch (error) {
    return null
  }
}

async function LangListDec(){
  const languages = await getLanguages()
  if(languages){
    const res = Object.keys(languages)
      .reduce((msg,l, i) => msg += `\n${i+1}.    ${l}       (${languages[l].nativeName})`, 'Languages:')
    return res
  }else return null
}

async function translateDec(params){
  
  try {
    
    if(languages.includes(params[1])&&languages.includes(params[0])){
      const [from, to, ...text] = [...params]
      const res = await translate(from, to, text.join(' '))
      return res[0].text
    }

    if(languages.includes(params[0])){
      const [to, ...text] = [...params]
      const res = await translateWithDetect(to, text.join(' '))
      return `<from ${res.detectedLanguage.language}> ${res.translations[0].text}` 
    }

    let language = await detectLanguage(params.join(' '))
    language = language[0].language
    if(language === 'en') lang = 'ru'
    if(language === 'ru') lang = 'en'
    const res = await translateWithDetect(lang||'ru', params.join(' '))
    return `<from ${res.detectedLanguage.language}> ${res.translations[0].text}`
  } catch (error) {
    return null
  }
}

async function translateWithDetectDec(to, text){
  let res =  await translateWithDetect(to, text)
  return `<Detected language : ${res.detectedLanguage.language}>\n ${res.translations[0].text}` 
}

module.exports.translateWithDetect = translateWithDetect
module.exports.translateWithDetectDec = translateWithDetectDec
module.exports.translate = translate
module.exports.getLanguages = getLanguages
module.exports.LangListDec = LangListDec
module.exports.translateDec = translateDec