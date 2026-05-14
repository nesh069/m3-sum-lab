import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ProductProvider } from '../context/ProductContext';
import AddProductPage from '../pages/AddProductPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('AddProductPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ id: 3, name: 'New Coffee' }),
      })
    );
    mockNavigate.mockClear();
  });

  it('renders form with all required fields', () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <AddProductPage />
        </ProductProvider>
      </BrowserRouter>
    );

    expect(screen.getByLabelText(/Product Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Description/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Origin/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Price/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Create Product/i })).toBeInTheDocument();
  });

  it('submits form with POST request and navigates to products', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <AddProductPage />
        </ProductProvider>
      </BrowserRouter>
    );

    fireEvent.change(screen.getByLabelText(/Product Name/i), {
      target: { value: 'New Coffee' },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: 'Test description' },
    });
    fireEvent.change(screen.getByLabelText(/Origin/i), {
      target: { value: 'Brazil' },
    });
    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '15.99' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Create Product/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/coffee',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: expect.stringContaining('New Coffee'),
        })
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});