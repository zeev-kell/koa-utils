/**
 * Created by keziyuan on 2018/3/30 10:59.
 */
// 省略http参数和body为空
module.exports = function (value) {
  if (typeof value === 'string') {
    return value
  }
  value = JSON.stringify(value);
  return value === '{}' ? undefined : value
};
