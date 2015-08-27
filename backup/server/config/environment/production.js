'use strict';

// Production specific configuration
// =================================
module.exports = {
  pcm: {
    url: "http://rogue-dev.creyate.biz:8080/rogue/api/v1/en/in/",
    options: {
      host: 'rogue-dev.creyate.biz',
      port: 8080,
      path: '/rogue/api/v1/en/in/'
    }
  },
  // Server IP
  ip: '0.0.0.0',

  // Server port
  port: 80,
  // MongoDB connection options
  mongo: {
    uri: process.env.MONGOLAB_URI ||
      process.env.MONGOHQ_URL ||
      process.env.OPENSHIFT_MONGODB_DB_URL + process.env.OPENSHIFT_APP_NAME ||
      'mongodb://localhost/mystique'
  }
};
