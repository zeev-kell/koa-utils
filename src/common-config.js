// 是否是开发模式
const IS_DEVELOP = process.env.IS_DEVELOP || process.env.NODE_ENV === 'test';
// 是否是 http 服务，默认 https 服务
const IS_HTTP = (process.env.IS_HTTP && process.env.IS_HTTP === 'true');
// 是否是创建本地服务
const IS_LOCAL = (process.env.IS_LOCAL && process.env.IS_LOCAL === 'true');
// 是否是阿里内部集群
const IS_INSIDE = (process.env.IS_INSIDE && process.env.IS_INSIDE === 'true');

console.log(`process.env.IS_DEVELOP: ${process.env.IS_DEVELOP}`);
console.log(`process.env.IS_HTTP: ${process.env.IS_HTTP}`);
console.log(`process.env.IS_LOCAL: ${process.env.IS_LOCAL}`);
console.log(`process.env.IS_LOCAL: ${process.env.IS_LOCAL}`);
console.log(`process.env.IS_INSIDE: ${process.env.IS_INSIDE}`);

module.exports = {
  IS_DEVELOP,
  IS_HTTP,
  IS_LOCAL,
  IS_INSIDE
}
