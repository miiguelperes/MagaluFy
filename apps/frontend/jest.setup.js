import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

if (typeof window !== 'undefined' && !window.IntersectionObserver) {
  class IntersectionObserver {
    constructor() {} // NOSONAR
    observe() { return null; }
    disconnect() { return null; }
    unobserve() { return null; }
    takeRecords() { return []; }
  }
  window.IntersectionObserver = IntersectionObserver;
} 