global.TextEncoder = require('util').TextEncoder;
global.TextDecoder = require('util').TextDecoder;
if (typeof global.setImmediate === 'undefined') {
  global.setImmediate = (fn, ...args) => setTimeout(fn, 0, ...args);
}
if (typeof global.IntersectionObserver === 'undefined') {
  global.IntersectionObserver = class {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    observe() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnect() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unobserve() {}
  };
} 