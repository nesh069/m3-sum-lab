import { renderHook, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import useFetch from '../hooks/useFetch';

describe('useFetch', () => {
  it('returns loading state initially', () => {
    global.fetch = vi.fn(() => new Promise(() => {}));
    
    const { result } = renderHook(() => useFetch('http://localhost:3001/test'));
    
    expect(result.current.loading).toBe(true);
    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
  });

  it('returns data after successful fetch', async () => {
    const mockData = [{ id: 1, name: 'Test' }];
    
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockData),
      })
    );

    const { result } = renderHook(() => useFetch('http://localhost:3001/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.data).toEqual(mockData);
    expect(result.current.error).toBeNull();
  });

  it('returns error on failed fetch', async () => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        status: 500,
        statusText: 'Internal Server Error',
      })
    );

    const { result } = renderHook(() => useFetch('http://localhost:3001/test'));

    await waitFor(() => {
      expect(result.current.loading).toBe(false);
    });

    expect(result.current.error).toContain('500');
    expect(result.current.data).toBeNull();
  });
});