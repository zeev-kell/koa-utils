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
    console.log('can\'t translate ' + arg[0]);
    return arg[0];
  }
};

module.exports.languages = languages;
