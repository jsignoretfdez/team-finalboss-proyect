module.exports = {
  apps: [{
    name: 'nodepop',
    script: './routes/index.js',
    instances: 1,
    watch: '.',
  }, {
    name: 'createThumbnailService',
    script: './microservices/createThumbnail.js',
    instances: 1,
    watch: '.',
  }],

  deploy: {
    production: {
      user: 'SSH_USERNAME',
      host: 'SSH_HOSTMACHINE',
      ref: 'origin/master',
      repo: 'GIT_REPOSITORY',
      path: 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy': 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
    },
  },
};
