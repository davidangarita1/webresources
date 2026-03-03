import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { Toggle } from '../Toggle/Toggle';

vi.mock('@assets/sun.png', () => ({ default: 'sun.png' }));
vi.mock('@assets/moon.png', () => ({ default: 'moon.png' }));

describe('Toggle', () => {
  beforeEach(() => localStorage.clear());

  it('renders a button element', () => {
    render(<Toggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows "Switch to dark mode" label in light mode', () => {
    render(<Toggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Switch to dark mode');
  });

  it('has aria-pressed false in light mode', () => {
    render(<Toggle />);
    expect(screen.getByRole('button')).toHaveAttribute('aria-pressed', 'false');
  });

  it('renders the sun and moon images', () => {
    render(<Toggle />);
    expect(screen.getByAltText('Light mode')).toBeInTheDocument();
    expect(screen.getByAltText('Dark mode')).toBeInTheDocument();
  });

  it('toggles to dark mode on click', async () => {
    const user = userEvent.setup();
    render(<Toggle />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'true');
    expect(button).toHaveAttribute('aria-label', 'Switch to light mode');
  });

  it('toggles back to light mode on second click', async () => {
    const user = userEvent.setup();
    render(<Toggle />);
    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
    expect(button).toHaveAttribute('aria-pressed', 'false');
  });

  it('applies toggle--dark class when dark mode is active', async () => {
    const user = userEvent.setup();
    render(<Toggle />);
    const button = screen.getByRole('button');
    await user.click(button);
    expect(button).toHaveClass('toggle--dark');
  });

  it('does not have toggle--dark class in light mode', () => {
    render(<Toggle />);
    expect(screen.getByRole('button')).not.toHaveClass('toggle--dark');
  });

  it('renders the thumb span element', () => {
    render(<Toggle />);
    const thumb = document.querySelector('.toggle-thumb');
    expect(thumb).toBeInTheDocument();
  });
});
