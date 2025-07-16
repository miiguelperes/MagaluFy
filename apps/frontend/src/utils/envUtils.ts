// @ts-expect-error Vite: import.meta.env não existe fora do Vite, mas é seguro aqui
export function getIsE2E() {
  return typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_E2E;
} 