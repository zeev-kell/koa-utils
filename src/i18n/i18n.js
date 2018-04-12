class Translator {
  constructor() {
    this.values = {};
  }

  add(values) {
    for (let k in values) {
      let v = values[k];
      this.values[k] = v;
    }
  }

  translate(text, numOrFormatting, formatting) {
    let value = this.getValue(text);
    // 直接翻译
    if (typeof numOrFormatting === 'undefined') {
      return value;
    }
    // 格式化 %{key} 字段
    if (typeof numOrFormatting === 'object' && !!numOrFormatting) {
      return this.applyFormatting(value, numOrFormatting);
    }
    // 先格式化 %n -%n ，然后再格式化 %{key}
    if (typeof numOrFormatting === 'number') {
      value = this.applyNum(value, numOrFormatting);
      if (value === null) {
        console.log('not found ' + text);
        return;
      }
      return formatting ? this.applyFormatting(value, formatting) : value;
    }
  }

  getValue(text) {
    let value = this.values[text];
    if (!value) {
      console.log('can\'t translate ' + text);
      return;
    }
    return value;
  }

  // 格式化 %n -%n 字段
  static applyNum(value, num) {
    if (value instanceof Array || value.length) {
      for (let i = 0; i < value.length; i++) {
        let triple = value[i];
        if ((num >= triple[0] || triple[0] === null) && (num <= triple[1] || triple[1] === null)) {
          return triple[2].replace('-%n', String(-num)).replace('%n', String(num));
        }
      }
    }
    return null;
  }

  // 格式化 %{key} 字段
  static applyFormatting(text, formatting) {
    for (let ind in formatting) {
      let regex = new RegExp('%{' + ind + '}', 'g');
      text = text.replace(regex, formatting[ind]);
    }
    return text;
  }

  static create(values) {
    let translator = new Translator();
    if (values) {
      translator.add(values);
    }
    return translator;
  }
}

module.exports = Translator;
