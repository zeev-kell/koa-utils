// gulp.config.js
module.exports = {
  'NODE_TLS_REJECT_UNAUTHORIZED': '0',
  'NODE_ENV': process.env.NODE_ENV || 'development',
  'NODE_BRANCH': process.env.NODE_BRANCH || 'local',
  'IS_DEVELOP': true,
  'IS_HTTP': true
}
