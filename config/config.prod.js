'use strict';

module.exports = appInfo => {
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1543982349689_7649';

  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: [ 'http://localhost:8080', 'http://localhost:3000', 'http://www.vidahaha.top' ],
  };

  config.cors = {
    credentials: true,
  };

  // add your config here
  config.middleware = [];

  return config;
};
