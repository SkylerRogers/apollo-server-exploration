const { NODE_ENV = 'development' } = process.env;
const { dir } = require(`./config/${NODE_ENV}.json`);

// start server
require('babel-polyfill');
require(`./${dir}/server`);
