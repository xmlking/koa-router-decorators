'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

exports.route = route;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var HttpMethod = (function () {
  function HttpMethod() {
    _classCallCheck(this, HttpMethod);
  }

  // decorator factory

  _createClass(HttpMethod, null, [{
    key: 'HEAD',
    value: 'HEAD',
    enumerable: true
  }, {
    key: 'OPTIONS',
    value: 'OPTIONS',
    enumerable: true
  }, {
    key: 'GET',
    value: 'GET',
    enumerable: true
  }, {
    key: 'PUT',
    value: 'PUT',
    enumerable: true
  }, {
    key: 'PATCH',
    value: 'PATCH',
    enumerable: true
  }, {
    key: 'POST',
    value: 'POST',
    enumerable: true
  }, {
    key: 'DELETE',
    value: 'DELETE',
    enumerable: true
  }]);

  return HttpMethod;
})();

exports.HttpMethod = HttpMethod;

function route(path) {
  var method = arguments.length <= 1 || arguments[1] === undefined ? HttpMethod.GET : arguments[1];
  if (typeof path !== 'string') throw new TypeError('Value of argument \'path\' violates contract, expected string got ' + (path === null ? 'null' : path instanceof Object && path.constructor ? path.constructor.name : typeof path));
  if (typeof method !== 'string') throw new TypeError('Value of argument \'method\' violates contract, expected string got ' + (method === null ? 'null' : method instanceof Object && method.constructor ? method.constructor.name : typeof method));

  return function (target, key, descriptor) {

    if (!path) {
      console.error('@route should have at lease one argument: path');
      process.exit(1);
    }

    if (!target.prototype.router) {
      target.prototype.router = new _koaRouter2['default']();
    }

    if (target && !key && !descriptor) {
      target.prototype.router.prefix(path);
    } else {

      if (!method) {
        console.error('@route on method should have "method" as second argument');
        process.exit(1);
      }
      switch (method) {
        case HttpMethod.HEAD:
          target.prototype.router.head('/', descriptor.value);
          break;
        case HttpMethod.OPTIONS:
          target.prototype.router.options('/', descriptor.value);
          break;
        case HttpMethod.GET:
          target.prototype.router.get('/', descriptor.value);
          break;
        case HttpMethod.PUT:
          target.prototype.router.put('/', descriptor.value);
          break;
        case HttpMethod.PATCH:
          target.prototype.router.patch('/', descriptor.value);
          break;
        case HttpMethod.POST:
          target.prototype.router.post('/', descriptor.value);
          break;
        case HttpMethod.DELET:
          target.prototype.router['delete']('/', descriptor.value);
          break;
        default:
          throw new Error('@route decorator "method" is not valid');
      }
    }
  };
}