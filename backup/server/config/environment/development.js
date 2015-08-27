'use strict';

// Development specific configuration
// ==================================
module.exports = {
  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/mystique-dev'
  },

  pcm: {
    url: "http://rogue-dev.creyate.biz:8080/rogue/api/v2/en/in/",
    options: {
      host: 'rogue-dev.creyate.biz',
      port: 8080,
      path: '/rogue/api/v1/en/in/'
    }
  },

  seedDB: true
};
