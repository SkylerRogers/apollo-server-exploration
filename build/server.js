'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _apolloServerExpress = require('apollo-server-express');

var _schema = require('./schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _process$env = process.env,
    _process$env$PORT = _process$env.PORT,
    PORT = _process$env$PORT === undefined ? 3000 : _process$env$PORT,
    _process$env$NODE_ENV = _process$env.NODE_ENV,
    NODE_ENV = _process$env$NODE_ENV === undefined ? 'development' : _process$env$NODE_ENV;

var app = (0, _express2.default)();

// Server Config
var config = {
  context: {},
  cacheControl: true
  // tracing: NODE_ENV === 'development',
};

// bodyParser is needed just for POST.
app.use('/graphql', _bodyParser2.default.json(), (0, _apolloServerExpress.graphqlExpress)(_extends({ schema: _schema.schema }, config)));
app.get('/graphiql', (0, _apolloServerExpress.graphiqlExpress)({ endpointURL: '/graphql' }));

app.listen(PORT, function () {
  return console.log('server running on port ' + PORT);
});