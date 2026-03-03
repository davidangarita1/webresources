import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DarkModeProvider } from './context/DarkModeContext';
import App from './App';

vi.mock('./data/resources.json', () => ({
  default: [
    {
      id: 1,
      name: 'Test Resource',
      description: 'A test resource',
      url: 'https://example.com',
      category: ['Testing'],
      headerColor: '#4F46E5',
      nameColor: '#ffffff',
    },
  ],
}));

vi.mock('@assets/sun.png', () => ({ default: 'sun.png' }));
vi.mock('@assets/moon.png', () => ({ default: 'moon.png' }));

const renderApp = () =>
  render(
    <DarkModeProvider>
      <App />
    </DarkModeProvider>
  );

describe('App', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => window.history.pushState({}, '', '/'));

  it('renders Dashboard at "/"', () => {
    renderApp();
    expect(screen.getByRole('textbox', { name: /search/i })).toBeInTheDocument();
  });

  it('renders the resource card on Dashboard', () => {
    renderApp();
    expect(screen.getByText('Test Resource')).toBeInTheDocument();
  });

  it('renders Toggle button', () => {
    renderApp();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders Footer', () => {
    renderApp();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders NotFound page at unknown path', () => {
    window.history.pushState({}, '', '/ruta-desconocida');
    renderApp();
    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
  });
});
