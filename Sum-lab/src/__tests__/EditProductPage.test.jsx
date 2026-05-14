import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ProductProvider } from '../context/ProductContext';
import EditProductPage from '../pages/EditProductPage';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useParams: () => ({ id: '1' }),
  };
});

const mockProduct = {
  id: 1,
  name: 'Vanilla bean',
  description: 'Medium Roast, nutty flavor',
  origin: 'Columbia',
  price: 10.00,
};

describe('EditProductPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes('/coffee/1')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProduct),
        });
      }
      return Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ ...mockProduct, price: 11.00 }),
      });
    });
    mockNavigate.mockClear();
  });

  it('loads existing product data into form', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <EditProductPage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Vanilla bean')).toBeInTheDocument();
    });
    
    expect(screen.getByDisplayValue('Medium Roast, nutty flavor')).toBeInTheDocument();
    expect(screen.getByDisplayValue('Columbia')).toBeInTheDocument();
  });

  it('submits PATCH request with updated data', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <EditProductPage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByDisplayValue('Vanilla bean')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByLabelText(/Price/i), {
      target: { value: '11.00' },
    });

    fireEvent.click(screen.getByRole('button', { name: /Update Product/i }));

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        'http://localhost:3001/coffee/1',
        expect.objectContaining({
          method: 'PATCH',
        })
      );
    });

    expect(mockNavigate).toHaveBeenCalledWith('/products');
  });
});