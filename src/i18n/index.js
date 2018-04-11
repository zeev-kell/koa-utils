const Translator = require('./i18n');
const {zh, en} = require('./common-translation');

let languages = {
  zh: Translator.create(zh),
  en: Translator.create(en)
}

module.exports = function (lang, ...arg) {
  return languages[lang].translate(...arg);
};

module.exports.languages = languages;
