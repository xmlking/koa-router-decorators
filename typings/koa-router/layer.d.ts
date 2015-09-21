export default class Layer {
    opts: {
        name?: string;
        prefix?: string;
        sensitive?: boolean;
        strict?: boolean;
    };
    name: string;
    methods: [string];
    fns: {
        params: {};
        middleware: [Function];
    };
    middleware: Function;
    paramNames: any[];
    path: string;
    regexp: RegExp;
    constructor(path: any, methods: any, middleware: any, opts?: {});
    match(path: any): boolean;
    params(path: any, captures: any, existingParams: any): any;
    captures(path: any): any;
    url(params: any): string;
    param(param: any, fn: any): Layer;
    setPrefix(prefix: any): Layer;
}
