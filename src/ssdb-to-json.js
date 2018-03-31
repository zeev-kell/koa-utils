/**
 * Created by keziyuan on 2018/3/31 19:43.
 * 格式化 ssdb 返回来的数据
 * 把数组转成 json
 * @param map
 * @returns {{}}
 */
module.exports = function (map) {
  let result = {};
  for (let i = 0; i < map.length - 1; i += 2) {
    result[map[i]] = map[i + 1]
  }
  return result
}
