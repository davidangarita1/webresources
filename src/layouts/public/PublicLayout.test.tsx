import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { DarkModeProvider } from '../../context/DarkModeContext';
import PublicLayout from './PublicLayout';

vi.mock('@assets/sun.png', () => ({ default: 'sun.png' }));
vi.mock('@assets/moon.png', () => ({ default: 'moon.png' }));

const renderLayout = (initialEntry = '/') =>
  render(
    <MemoryRouter initialEntries={[initialEntry]}>
      <DarkModeProvider>
        <Routes>
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<div>Outlet content</div>} />
          </Route>
        </Routes>
      </DarkModeProvider>
    </MemoryRouter>
  );

describe('PublicLayout', () => {
  beforeEach(() => localStorage.clear());

  it('renders the main content area', () => {
    renderLayout();
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  it('renders the toggle button', () => {
    renderLayout();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('renders the footer', () => {
    renderLayout();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('renders the outlet child content', () => {
    renderLayout();
    expect(screen.getByText('Outlet content')).toBeInTheDocument();
  });

  it('layout div does not have dark-mode class by default', () => {
    renderLayout();
    const layout = document.querySelector('.layout');
    expect(layout).not.toHaveClass('dark-mode');
  });

  it('layout div has dark-mode class when seeded via localStorage', () => {
    localStorage.setItem('dw_darkmode', 'true');
    renderLayout();
    expect(document.querySelector('.layout')).toHaveClass('dark-mode');
  });
});
