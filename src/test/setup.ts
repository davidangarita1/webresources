import '@testing-library/jest-dom';
import '../i18n';
import i18n from '../i18n';

// Polyfill window.matchMedia for jsdom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});

// Force Spanish for tests so existing Spanish-language assertions continue to pass
beforeAll(async () => {
  await i18n.changeLanguage('es');
});
