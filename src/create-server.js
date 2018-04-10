/**
 * 判断是否需要证书启动
 * config.IS_LOCAL 启动本地服务，不允许别的服务调用
 * @param app instanceof koa
 * @param config
 * @returns {*}
 */
module.exports = function (app, config) {
  /** @namespace config.IS_LOCAL */
  let CreateServer = config.IS_LOCAL ? require('./create-local-server') : require('./create-open-server');
  return CreateServer(app, config)
}
