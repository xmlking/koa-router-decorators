# Koa Router Decorators

ES7 decorators for koa-router model.

## Installation

```bash
$ npm i koa-router-decorators --save
```

## Usage

This library supports [ES7 decorators proposal][decorators-url] which is supported by babel. 
To use it you should enable experimental `es7.decorators` feature in babel as described [here][babel-experimental-url].

Example:

```js
import {route, HttpMethod} from 'koa-router-decorators';
import User from '../models/User'

@route('/users')
export default class UserController {

  router:Router;

  constructor() {
    return this.router.routes();
  }
  
  @route('/', HttpMethod.GET)
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
      this.throw( 'DB Error: Unable to same', 500);
    }

    this.status = 201;
    this.body = result
  }
}

```


### Development 

You need babel installed globally 
```bash
npm install -g babel
```
 
 to publish to npm registry 
 ```bash
 npm publish
 ```
 

[babel-url]: http://babeljs.io/
[decorators-url]: https://github.com/wycats/javascript-decorators
[babel-experimental-url]: https://babeljs.io/docs/usage/experimental/#usage

 