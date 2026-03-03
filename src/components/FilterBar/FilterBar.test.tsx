import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '../../test/utils';
import userEvent from '@testing-library/user-event';
import { FilterBar } from '../FilterBar/FilterBar';

describe('FilterBar', () => {
  it('renders the search input', () => {
    render(<FilterBar onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox', { name: /search resources/i })).toBeInTheDocument();
  });

  it('shows the correct placeholder text', () => {
    render(<FilterBar onSearch={vi.fn()} />);
    expect(screen.getByPlaceholderText('Search resources by name…')).toBeInTheDocument();
  });

  it('calls onSearch with the input value on change', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<FilterBar onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'react');
    expect(onSearch).toHaveBeenCalledTimes(5);
    expect(onSearch).toHaveBeenLastCalledWith('react');
  });

  it('calls onSearch with empty string when input is cleared', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();
    render(<FilterBar onSearch={onSearch} />);
    const input = screen.getByRole('textbox');
    await user.type(input, 'vite');
    await user.clear(input);
    expect(onSearch).toHaveBeenLastCalledWith('');
  });

  it('input has correct name attribute', () => {
    render(<FilterBar onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('name', 'searchBar');
  });

  it('input is of type text', () => {
    render(<FilterBar onSearch={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveAttribute('type', 'text');
  });
});
