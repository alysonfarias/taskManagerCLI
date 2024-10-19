let mockData = '';

export const writeFileSync = (path: string, data: string): void => {
  mockData = data;
};

export const readFileSync = (path: string): string => {
  return mockData || '[]';
};

export const existsSync = (path: string): boolean => {
  return true; // Assume file always exists in tests
};

export const resetMock = (): void => {
  mockData = ''; // Reset mock data between tests
};
