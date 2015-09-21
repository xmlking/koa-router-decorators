import expect from  './masala-chai';
// import Router from 'koa-router';
import Router = require('koa-router');
import {HttpMethod, route} from '../src/index';

describe('route decorator', () => {
  beforeEach(() => {

  });

  it('on class should produce an object with appropriate router', () => {
    @route('/users')
    class UserController {
      router: Router;
      constructor() {
      }
      static *foo() {}
    }
    let userCtrl = new UserController();
    expect(userCtrl.router).to.be.an.instanceof(Router);
    expect(userCtrl.router).to.have.deep.property('opts.prefix', '/users');
    expect(UserController).itself.to.respondTo('foo');
  });

  it('on method should produce an object with appropriate router', () => {
    @route('/users')
    class UserController {
      router: Router;
      constructor() {
      }
      @route('/', HttpMethod.GET)
      static *foo() {}
    }
    let userCtrl = new UserController();
    expect(userCtrl.router).to.have.deep.property('stack[0].path', '/users/' );
    expect(UserController).itself.to.respondTo('foo');
  });

});
