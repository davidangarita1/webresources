import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import NotFound from './NotFound';

describe('NotFound', () => {
  it('renders the 404 code', () => {
    render(<NotFound />);
    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the page not found heading', () => {
    render(<NotFound />);
    expect(screen.getByRole('heading', { name: /page not found/i })).toBeInTheDocument();
  });

  it('renders the descriptive message', () => {
    render(<NotFound />);
    expect(screen.getByText(/does not exist/i)).toBeInTheDocument();
  });

  it('renders a go back home link', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /go back home/i })).toBeInTheDocument();
  });

  it('home link navigates to "/"', () => {
    render(<NotFound />);
    expect(screen.getByRole('link', { name: /go back home/i })).toHaveAttribute('href', '/');
  });
});
