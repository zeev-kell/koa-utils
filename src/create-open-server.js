/**
 * 判断是否需要证书启动
 * config.IS_HTTP 开发模式不启动证书
 * @param app instanceof koa
 * @param config
 * @returns {*}
 */
module.exports = function (app, {PORT, IS_HTTP, SSL_KEY_File, SSL_File}) {
  PORT = process.env.PORT || PORT;
  if (IS_HTTP) {
    return app.listen(PORT, () => {
      console.log(`Listening on http://localhost:${PORT}`)
    });
  }
  const fs = require('fs');
  const ssl = {
    key: fs.readFileSync(SSL_KEY_File),
    cert: fs.readFileSync(SSL_File)
  };
  require('https')
    .createServer(ssl, app.callback())
    .listen(PORT, () => console.log(`Listening on https://localhost:${PORT}`))
}
