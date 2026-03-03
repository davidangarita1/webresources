import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import type { ReactNode } from 'react';
import { DarkModeProvider, useDarkMode } from '../context/DarkModeContext';

const wrapper = ({ children }: { children: ReactNode }) => (
  <DarkModeProvider>{children}</DarkModeProvider>
);

describe('DarkModeContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('defaults to false when localStorage is empty', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.isActive).toBe(false);
  });

  it('reads initial value from localStorage', () => {
    localStorage.setItem('dw_darkmode', 'true');
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.isActive).toBe(true);
  });

  it('toggle switches isActive from false to true', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isActive).toBe(true);
  });

  it('toggle switches isActive from true to false', () => {
    localStorage.setItem('dw_darkmode', 'true');
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    act(() => {
      result.current.toggle();
    });
    expect(result.current.isActive).toBe(false);
  });

  it('persists isActive to localStorage on change', () => {
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    act(() => {
      result.current.toggle();
    });
    expect(localStorage.getItem('dw_darkmode')).toBe('true');
  });

  it('handles corrupted localStorage gracefully and defaults to false', () => {
    localStorage.setItem('dw_darkmode', 'invalid_json{{');
    const { result } = renderHook(() => useDarkMode(), { wrapper });
    expect(result.current.isActive).toBe(false);
  });

  it('useDarkMode throws when used outside DarkModeProvider', () => {
    expect(() =>
      renderHook(() => useDarkMode())
    ).toThrow('useDarkMode must be used within DarkModeProvider');
  });
});
