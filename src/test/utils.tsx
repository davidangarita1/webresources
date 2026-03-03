import { render } from '@testing-library/react';
import type { RenderOptions } from '@testing-library/react';
import type { ReactElement } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { DarkModeProvider } from '../context/DarkModeContext';

const AllProviders = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter>
    <DarkModeProvider>{children}</DarkModeProvider>
  </MemoryRouter>
);

const renderWithProviders = (ui: ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: AllProviders, ...options });

export * from '@testing-library/react';
export { renderWithProviders as render };
