/**
 * 判断是否需要证书启动
 * config.IS_HTTP 开发模式不启动证书
 * 启动本地服务 127.0.0.1
 * @param app instanceof koa
 * @param config
 * @returns {*}
 */
module.exports = function (app, {PORT, IS_HTTP, SSL_KEY_File, SSL_File}) {
  PORT = process.env.PORT || PORT;
  if (IS_HTTP) {
    Object.defineProperty(app.context, 'host', {
      get: function () {
        return '127.0.0.1'
      }
    });
    return app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    })
  }
  const fs = require('fs');
  const {ssl} = {
    key: fs.readFileSync(SSL_KEY_File),
    cert: fs.readFileSync(SSL_File)
  };
  require('https')
    .createServer(ssl, app.callback())
    .listen(PORT, '127.0.0.1', () => console.log(`\x1b[31mListening on https://localhost:${PORT}\x1b[0m`))
}
