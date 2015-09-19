// Ambient declaration for koa-router
declare module 'koa-router' {

  export class Layer {
    opts: Object;
    name: string;
    methods: [string];
    paramNames: [string];
    fns: { params: Object, middleware: [Function] };
    constructor(path, methods, middleware, opts);
  }

  export class Router {
    opts: Object;
    params: Object;
    methods: [string];
    stack: [Layer];
    constructor({prefix: string}?);

    use(path: string, middleware): Router;
    prefix(prefix: string): Router;
    routes();
    middleware();
    redirect (source: string, destination: string, code: number): Router;
    all(name: string, path: string, middleware: Function): Router;
    param(param, middleware): Router;
    allowedMethods(options: Object): Function;
    url(name: String, params: Object): string;
  }

}
