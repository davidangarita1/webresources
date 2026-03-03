import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { ResourceCard } from '../ResourceCard/ResourceCard';

const defaultProps = {
  name: 'Tailwind CSS',
  description: 'A utility-first CSS framework.',
  url: 'https://tailwindcss.com',
  nameColor: '#FFFFFF',
  headerColor: '#06B6D4',
  category: ['CSS', 'Tools'],
};

describe('ResourceCard', () => {
  it('renders the resource name', () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText('Tailwind CSS')).toBeInTheDocument();
  });

  it('renders the resource description', () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText('A utility-first CSS framework.')).toBeInTheDocument();
  });

  it('renders a link with the correct href', () => {
    render(<ResourceCard {...defaultProps} />);
    const link = screen.getByRole('link', { name: /Open Tailwind CSS/i });
    expect(link).toHaveAttribute('href', 'https://tailwindcss.com');
  });

  it('opens the link in a new tab with rel noopener noreferrer', () => {
    render(<ResourceCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('target', '_blank');
    expect(link).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders all category badges', () => {
    render(<ResourceCard {...defaultProps} />);
    expect(screen.getByText('CSS')).toBeInTheDocument();
    expect(screen.getByText('Tools')).toBeInTheDocument();
  });

  it('applies headerColor and nameColor inline styles', () => {
    render(<ResourceCard {...defaultProps} />);
    const header = document.querySelector('.resource-header') as HTMLElement;
    expect(header.style.backgroundColor).toBe('rgb(6, 182, 212)');
    expect(header.style.color).toBe('rgb(255, 255, 255)');
  });

  it('renders empty category list without badges', () => {
    render(<ResourceCard {...defaultProps} category={[]} />);
    const badges = document.querySelectorAll('.badge');
    expect(badges).toHaveLength(0);
  });

  it('has correct aria-label for accessibility', () => {
    render(<ResourceCard {...defaultProps} />);
    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('aria-label', 'Open Tailwind CSS');
  });
});
