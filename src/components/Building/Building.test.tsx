import { describe, it, expect } from 'vitest';
import { render, screen } from '../../test/utils';
import { BuildingPage } from '../Building/Building';

describe('BuildingPage', () => {
  it('renders the provided title', () => {
    render(<BuildingPage title="En construcción" />);
    expect(screen.getByRole('heading', { name: 'En construcción' })).toBeInTheDocument();
  });

  it('renders the under construction message', () => {
    render(<BuildingPage title="Test" />);
    expect(screen.getByText(/under construction/i)).toBeInTheDocument();
  });

  it('renders the build icon', () => {
    render(<BuildingPage title="Test" />);
    expect(document.querySelector('.building-icon')).toBeInTheDocument();
  });

  it('renders the building container', () => {
    render(<BuildingPage title="Test" />);
    expect(document.querySelector('#building')).toBeInTheDocument();
  });

  it('renders different titles correctly', () => {
    const { rerender } = render(<BuildingPage title="Página A" />);
    expect(screen.getByRole('heading', { name: 'Página A' })).toBeInTheDocument();
    rerender(<BuildingPage title="Página B" />);
    expect(screen.getByRole('heading', { name: 'Página B' })).toBeInTheDocument();
  });
});
