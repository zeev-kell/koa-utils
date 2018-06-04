const path = require('path');
const fs = require('fs');

module.exports = function (app, config) {
  /** @namespace config.rootPath */
  const serverPath = path.join(config.rootPath, 'app/services');
  const serverNames = fs.readdirSync(serverPath)
    .map(fileName => fileName.split('.')[0]);

  function getInstance(ctx) {
    const service = {};
    if (!ctx._cache) {
      ctx._cache = new Map();
    }
    serverNames.forEach((serverName) => {
      Object.defineProperty(service, serverName, {
        get: () => {
          // 先获取上下文中的缓存
          let instance = ctx._cache.get(serverName);
          if (!instance) {
            // 获取对应的js文件
            let _module = require(path.join(config.rootPath, `app/services/${serverName}.js`));
            instance = new _module(ctx);
            ctx._cache.set(serverName, instance);
          }
          return instance;
        },
      });
    });
    return service;
  }

  Object.defineProperty(app.context, 'service', {
    get() {
      return getInstance(this);
    },
  });
};
