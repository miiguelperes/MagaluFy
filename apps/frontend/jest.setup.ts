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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  global.IntersectionObserver = class {
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    constructor() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    observe() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    disconnect() {}
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    unobserve() {}
  } as any;
} 