import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { useResources } from '../hooks/useResources';

vi.mock('../data/resources.json', () => ({
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

describe('useResources', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('returns allResources with parsed dates', () => {
    const { result } = renderHook(() => useResources());
    expect(result.current.allResources).toHaveLength(2);
    expect(result.current.allResources[0].date).toBeInstanceOf(Date);
    expect(result.current.allResources[1].date).toBeInstanceOf(Date);
  });

  it('initial filtered equals allResources', () => {
    const { result } = renderHook(() => useResources());
    expect(result.current.filtered).toHaveLength(2);
    expect(result.current.filtered).toEqual(result.current.allResources);
  });

  it('filterByName filters resources by name case-insensitive', () => {
    const { result } = renderHook(() => useResources());
    act(() => {
      result.current.filterByName('react');
    });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].name).toBe('React');
  });

  it('filterByName returns all resources when query is empty', () => {
    const { result } = renderHook(() => useResources());
    act(() => {
      result.current.filterByName('vite');
    });
    act(() => {
      result.current.filterByName('');
    });
    expect(result.current.filtered).toHaveLength(2);
  });

  it('filterByName trims whitespace before filtering', () => {
    const { result } = renderHook(() => useResources());
    act(() => {
      result.current.filterByName('  vite  ');
    });
    expect(result.current.filtered).toHaveLength(1);
    expect(result.current.filtered[0].name).toBe('Vite');
  });

  it('filterByName returns empty array when no match', () => {
    const { result } = renderHook(() => useResources());
    act(() => {
      result.current.filterByName('angular');
    });
    expect(result.current.filtered).toHaveLength(0);
  });

  it('allResources is stable across renders', () => {
    const { result, rerender } = renderHook(() => useResources());
    const first = result.current.allResources;
    rerender();
    expect(result.current.allResources).toBe(first);
  });
});
