# Koa Router Decorators

ES7 decorators for koa-router model.

## Installation

```bash
$ npm i koa-router-decorators --save
```

## Usage

This library supports [ES7 decorators proposal][decorators-url] which is supported by babel. 
To use it you should enable experimental `es7.decorators` feature in babel as described [here][babel-experimental-url].

```
 @route(path, HttpMethod, ...middleware)
 optional middlewares are before the target method. 
```
See [trust-broker](https://github.com/xmlking/trust-broker) for more examples  

### Example

```js
import {route, HttpMethod} from 'koa-router-decorators';
import User from '../models/User'

@route('/users')
export default class UserController {

  router:Router;

  constructor() {
    return this.router.routes();
  }
  
  @route('/', HttpMethod.GET, isAdmin)
  static *index(next) {
    let query = User.find().skip(0).limit(20);
    let users = yield query.exec();
    let count = yield User.count();
    this.body = {users, count};
  }

  @route('/', HttpMethod.POST)
  static *create(next) {
    let newUser =  new User(this.request.body);
    let result;
    try {
      result = yield newUser.save();
    } catch (err) {
      this.throw( 'DB Error: Unable to save', 500);
    }

    this.status = 201;
    this.body = result
  }
}

function *isAdmin(next) {
  if (!this.state.user.roles.includes('admin')) {
    throw new AuthorizationError(AuthorizationError.code.FORBIDDEN, {message: 'insufficient role (admin only)'});
  }
  yield next;
}
```

**Annotated routes are applied at the end. may overwrite manual added routes if path/method matches.** 

```js
import koa from 'koa';
import Router from 'koa-router';
import bodyParser from'koa-bodyparser';
import UserController from  './controllers/UserController';

rootRouter = new Router({
  prefix: '/api'
});

app = koa();
app.use(bodyParser());
app.use(new AuthController());
rootRouter.use('/v1', new UserController());
app
  .use(rootRouter.routes())
  .use(rootRouter.allowedMethods());
app.listen(3000);
```

### Development 

You need babel installed globally 
```bash
npm install -g typescript@next
npm install -g tslint
```
 
 to publish to npm registry 
 ```bash
 npm publish
 ```
 
### TODO
* remove  typescript -> definition in package.json 


[babel-url]: http://babeljs.io/
[decorators-url]: https://github.com/wycats/javascript-decorators
[babel-experimental-url]: https://babeljs.io/docs/usage/experimental/#usage

 