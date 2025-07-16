export function getIsE2E() {
  return typeof import.meta !== 'undefined' && import.meta.env?.VITE_E2E;
} 