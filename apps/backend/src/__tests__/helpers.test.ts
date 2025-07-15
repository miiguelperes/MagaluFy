// Exemplo de helper
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

describe('formatDate', () => {
  it('deve formatar a data no formato YYYY-MM-DD', () => {
    const date = new Date('2024-06-01T12:34:56Z');
    expect(formatDate(date)).toBe('2024-06-01');
  });
}); 