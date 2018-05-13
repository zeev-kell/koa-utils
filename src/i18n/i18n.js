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

  translate(text, numOrFormatting, formatting, defaultText) {
    // 判断是否含有 .
    if (text.includes('.')) {
      // invalid_key_parameter.project 会先翻译 project 然后数组 ['项目'] 作为 formatting
      let [t, ...arg] = text.split('.');
      arg = arg.map((a) => this.getValue(a));
      let value = this.getValue(t);
      return this.applyFormatting(value, arg);
    }
    let value = this.getValue(text);
    if (defaultText && typeof value === 'undefined') {
      return this.getValue(defaultText);
    }
    // 不需要格式化直接翻译
    if (typeof numOrFormatting === 'undefined') {
      return value;
    }
    // 格式化 %{key} 字段
    if (typeof numOrFormatting === 'object' && !!numOrFormatting) {
      return this.applyFormatting(value, numOrFormatting);
    }
    /**
     *  配合英文的翻译，目前是还没有用上，需要修改
     *  "Due in %n days":[
           [null, -2, "Due -%n days ago"],
           [-1, -1, "Due Yesterday"],
           [0, 0, "Due Today"],
           [1, 1, "Due Tomorrow"],
           [2, null, "Due in %n days"]
        ]
        i18n("Due in %n days", 2);    //  -> Due in 2 days
        i18n("Due in %n days", 1);    //  -> Due Tomorrow
        i18n("Due in %n days", -2);   //  -> Due 2 days ago
     */
    // 先格式化 %n -%n ，然后再格式化 %{key}
    if (typeof numOrFormatting === 'number') {
      value = Translator.applyNum(value, numOrFormatting);
      if (value === null) {
        console.log('not found ' + text);
        if (defaultText) {
          return this.getValue(defaultText);
        }
        return;
      }
      return formatting ? this.applyFormatting(value, formatting) : value;
    }
  }

  getValue(text) {
    // 如果能转成数字，就直接返回不翻译
    if (typeof text === 'number' || !Number.isNaN(Number(text))) {
      return text;
    }
    let value = this.values[text];
    if (!value) {
      console.log('not found ' + text);
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
  applyFormatting(text = '', formatting) {
    // [1,2,3] 等价于 { 0:1, 1:2, 2:3 }
    for (let ind in formatting) {
      // ind 不是数字时，需要把对应的字段翻译
      // { 0:1, key:'project'}
      if (Number.isNaN(Number(ind))) {
        formatting[ind] = this.getValue(formatting[ind]);
      }
      let regex = new RegExp('%\\{' + ind + '\\}', 'g');
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
