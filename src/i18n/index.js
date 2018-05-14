const Translator = require('./i18n');
const {zh, en} = require('./common-translation');

let languages = {
  zh: Translator.create(zh),
  en: Translator.create(en)
}

module.exports = function (lang, ...arg) {
  if (!['zh', 'en'].includes(lang)) {
    lang = 'zh';
  }
  try {
    return languages[lang].translate(...arg);
  } catch (e) {
    console.log('can\'t translate ' + arg[0] + ' with e:');
    console.log(e);
    return arg[0];
  }
};

module.exports.languages = languages;
module.exports.bindLang = function (lang) {
  if (!['zh', 'en'].includes(lang)) {
    lang = 'zh';
  }
  return languages[lang].translate.bind(languages[lang]);
}
