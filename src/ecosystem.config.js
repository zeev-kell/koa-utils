// ecosystem.config.js
module.exports = {
  script: './app.js',
  watch: true,
  env: {
    'NODE_BRANCH': 'develop',
    'IS_DEVELOP': true,
    'IS_LOCAL': false,
    'IS_INSIDE': true
  },
  env_master: {
    'NODE_BRANCH': 'master',
    'IS_LOCAL': true,
    'IS_INSIDE': true
  },
  env_stage: {
    'NODE_BRANCH': 'stage',
    'IS_LOCAL': true,
    'IS_INSIDE': true
  }
}
