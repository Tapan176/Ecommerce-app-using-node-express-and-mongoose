const morgan = require('morgan');

const format = function (tokens, req, res) {
  return [
    new Date().toISOString(),
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ');
};

const customMorgan = morgan(format);

module.exports = customMorgan;
