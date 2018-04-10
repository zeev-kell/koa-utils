// ecosystem.config.js
module.exports = {
  env: {
    'NODE_BRANCH': 'develop',
    'IS_DEVELOP': true,
    'IS_LOCAL': false
  },
  env_master: {
    'NODE_BRANCH': 'master',
    'IS_LOCAL': true
  },
  env_stage: {
    'NODE_BRANCH': 'stage',
    'IS_LOCAL': true
  }
}
