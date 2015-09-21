import Layer from './layer';
export declare enum HttpMethod {
    HEAD = 0,
    OPTIONS = 1,
    GET = 2,
    PUT = 3,
    PATCH = 4,
    POST = 5,
    DELETE = 6,
}
export default class Router {
    opts: {
        prefix?: string;
        routerPath?: string;
        methods?: [string];
        sensitive?: boolean;
        strict?: boolean;
    };
    params: Object;
    methods: [string];
    private stack;
    constructor(opts: {
        prefix?: string;
        methods?: [string];
    });
    use(path: any, middleware: any): Router;
    prefix(prefix: any): Router;
    routes(): (next: any) => {};
    allowedMethods(options: any): (next: any) => {};
    all(path: string, name?: string, ...middleware: Array<Function>): Router;
    redirect(source: any, destination: any, code: any): Router;
    register(path: any, methods: any, middleware: any, opts: any): Layer;
    route(name: any): any;
    url(name: any, params?: Object): any;
    match(path: any, method: any): {
        route: any;
        layers: any[];
        middleware: any[];
    };
    param(param: any, middleware: any): Router;
    static url(path: any, params: any): any;
}
