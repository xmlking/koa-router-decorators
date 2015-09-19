import * as utils from './utils';
// import Router from 'koa-router';
import Router = require('koa-router'); // FIXME: we still need old syntax for loading ES5 modules

export enum HttpMethod {
  HEAD,
  OPTIONS,
  GET,
  PUT,
  PATCH,
  POST,
  DELETE
}

// decorator factory
export function route(path: string, method?: HttpMethod, ...middleware: Array<Function> ) {

  return (target: Function, key: string | symbol, descriptor: any)  => {

    utils.assert(!path, '@route should have at least "path" argument' );

    if (!target.prototype.router) {
      target.prototype.router = new Router();
    }

    // on class
    if (target && !key && !descriptor) {
      utils.assert(!method, '@route on class should not have "method"' );
      target.prototype.router.prefix(path);
      if (middleware.length > 0) {
        target.prototype.router.use(...middleware);
      }
      return;
    }

    // on methods
    utils.assert(!method, '@route on method should have "method" as second argument' );

    switch (method) {
      case HttpMethod.HEAD:
        target.prototype.router.head(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.OPTIONS:
        target.prototype.router.options(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.GET:
        target.prototype.router.get(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.PUT:
        target.prototype.router.put(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.PATCH:
        target.prototype.router.patch(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.POST:
        target.prototype.router.post(path, ...middleware, descriptor.value);
        break;
      case HttpMethod.DELETE:
        target.prototype.router.delete(path, ...middleware, descriptor.value);
        break;
      default:
        throw new Error('@route decorator "method" is not valid');
    }

  };
}
