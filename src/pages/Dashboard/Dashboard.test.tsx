import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import Dashboard from './Dashboard';

vi.mock('../../data/resources.json', () => ({
  default: [
    {
      name: 'React',
      description: 'A JavaScript library for building user interfaces.',
      url: 'https://react.dev',
      category: ['JavaScript'],
      date: '2025-01-01T00:00:00.000Z',
      image: '',
      nameColor: '#FFFFFF',
      headerColor: '#61DAFB',
    },
    {
      name: 'Vite',
      description: 'Next generation frontend tooling.',
      url: 'https://vitejs.dev',
      category: ['Tools'],
      date: '2025-02-01T00:00:00.000Z',
      image: '',
      nameColor: '#FFFFFF',
      headerColor: '#646CFF',
    },
  ],
}));

describe('Dashboard', () => {
  beforeEach(() => localStorage.clear());

  it('renders the page heading', () => {
    render(<Dashboard />);
    expect(screen.getByRole('heading', { name: /resources/i })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<Dashboard />);
    expect(screen.getByText(/discover tools and references/i)).toBeInTheDocument();
  });

  it('renders all resource cards on load', () => {
    render(<Dashboard />);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('renders the search input', () => {
    render(<Dashboard />);
    expect(screen.getByRole('textbox', { name: /search resources/i })).toBeInTheDocument();
  });

  it('filters resources when typing in search', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await user.type(screen.getByRole('textbox'), 'react');
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.queryByText('Vite')).not.toBeInTheDocument();
  });

  it('shows no-results message when no resources match', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    await user.type(screen.getByRole('textbox'), 'angular');
    expect(screen.getByText(/no resources found/i)).toBeInTheDocument();
  });

  it('restores all results when search is cleared', async () => {
    const user = userEvent.setup();
    render(<Dashboard />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'angular');
    await user.clear(input);
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('Vite')).toBeInTheDocument();
  });

  it('renders resource card links', () => {
    render(<Dashboard />);
    const links = screen.getAllByRole('link');
    expect(links.length).toBeGreaterThanOrEqual(2);
  });
});
