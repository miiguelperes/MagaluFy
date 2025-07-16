import '@testing-library/jest-dom';

// Polyfill para TextEncoder/TextDecoder no Node.js
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextEncoder = TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (global as any).TextDecoder = TextDecoder;
}

// Mock import.meta
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).import = { meta: { env: { VITE_E2E: undefined } } };

// Mock IntersectionObserver
if (typeof global.IntersectionObserver === 'undefined') {
   
  global.IntersectionObserver = class {
     
    constructor() {} // NOSONAR
     
    observe() {}
     
    disconnect() {}
     
    unobserve() {}
  } as never;
}

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserver {
    readonly root = null;
    readonly rootMargin = '';
    readonly thresholds = [];
    constructor() {} // NOSONAR
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
    takeRecords() { return []; }
  }
  window.IntersectionObserver = IntersectionObserver as never;
} 