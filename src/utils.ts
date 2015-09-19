/**
 * "Clones" the given function by wrapping it into a pass-through function.
 * Doesn't preserve arity ('.length') and argument names.
 */
export function cloneFunction(func: Function) {
  'use strict';
  return function(...args) {return func.call(this, ...args); };
}

/**
 * Assertion utility.
 */
export function assert(ok: boolean, ...args: string[]): void {
  'use strict';
  if (!ok) { throw new Error(args.join(' ')); }
}
