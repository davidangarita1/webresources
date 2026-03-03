import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '../../test/utils';
import { Footer } from '../Footer/Footer';

describe('Footer', () => {
  beforeEach(() => localStorage.clear());

  it('renders the copyright text with current year', () => {
    render(<Footer />);
    const year = new Date().getFullYear().toString();
    expect(screen.getByText(new RegExp(year))).toBeInTheDocument();
  });

  it('renders the DangWebs.com link', () => {
    render(<Footer />);
    expect(screen.getByRole('link', { name: /dangwebs\.com/i })).toBeInTheDocument();
  });

  it('DangWebs.com link has correct href', () => {
    render(<Footer />);
    expect(screen.getByRole('link')).toHaveAttribute('href', 'https://www.dangwebs.com');
  });

  it('DangWebs.com link opens in new tab', () => {
    render(<Footer />);
    expect(screen.getByRole('link')).toHaveAttribute('target', '_blank');
  });

  it('DangWebs.com link has rel noopener noreferrer', () => {
    render(<Footer />);
    expect(screen.getByRole('link')).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders a footer element', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('does not apply dark-mode class in light mode', () => {
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).not.toHaveClass('dark-mode');
  });

  it('applies dark-mode class when dark mode is seeded in localStorage', () => {
    localStorage.setItem('dw_darkmode', 'true');
    render(<Footer />);
    expect(screen.getByRole('contentinfo')).toHaveClass('dark-mode');
  });
});
