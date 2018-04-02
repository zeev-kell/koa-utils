/**
 * 格式化 ssdb 返回来的数据
 */
module.exports = function (map) {
  let result = {};
  for (let i = 0; i < map.length - 1; i += 2) {
    result[map[i]] = map[i + 1]
  }
  return result
}
