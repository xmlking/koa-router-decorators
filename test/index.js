import Router from 'koa-router'
import sinon from "sinon";
import {HttpMethod, route} from '../src/';

describe('route decorator', () => {
  beforeEach(() => {

  });

  it('on class should product an object with appropriate router', () => {
    @route('/users')
    class UserController {
      router:Router;
      constructor() {
      }
      static *foo() {}
    }
    let userCtrl = new UserController();
    expect(userCtrl.router).to.be.an.instanceof(Router);
    expect(userCtrl.router).to.have.deep.property('opts.prefix','/users');
    expect(UserController).itself.to.respondTo('foo')
  });

  it('on method should product an object with appropriate router', () => {
    @route('/users')
    class UserController {
      router:Router;
      constructor() {
      }
      @route('/', HttpMethod.GET)
      static *foo() {}
    }
    let userCtrl = new UserController();
    expect(userCtrl.router).to.have.deep.property('stack[0].path','/users/');
    expect(UserController).itself.to.respondTo('foo')
  });

});
