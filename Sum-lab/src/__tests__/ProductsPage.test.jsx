import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { ProductProvider } from '../context/ProductContext';
import ProductsPage from '../pages/ProductsPage';

const mockProducts = [
  {
    id: 1,
    name: 'Vanilla bean',
    description: 'Medium Roast, nutty flavor',
    origin: 'Columbia',
    price: 10.00,
  },
  {
    id: 2,
    name: 'House Blend',
    description: 'Dark Roast, Rich flavor',
    origin: 'Vietnam',
    price: 12.00,
  },
];

describe('ProductsPage', () => {
  beforeEach(() => {
    global.fetch = vi.fn((url) => {
      if (url.includes('/coffee')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve(mockProducts),
        });
      }
      return Promise.reject(new Error('Unknown endpoint'));
    });
  });

  it('renders product list after loading', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <ProductsPage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Vanilla bean')).toBeInTheDocument();
    });
    
    expect(screen.getByText('House Blend')).toBeInTheDocument();
  });

  it('filters products based on search input', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <ProductsPage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Vanilla bean')).toBeInTheDocument();
    });

    const searchInput = screen.getByPlaceholderText('Search products...');
    fireEvent.change(searchInput, { target: { value: 'House' } });

    expect(screen.queryByText('Vanilla bean')).not.toBeInTheDocument();
    expect(screen.getByText('House Blend')).toBeInTheDocument();
  });

  it('renders edit and delete buttons for each product', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <ProductsPage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      const editButtons = screen.getAllByText('Edit');
      expect(editButtons.length).toBe(2);
    });

    const deleteButtons = screen.getAllByText('Delete');
    expect(deleteButtons.length).toBe(2);
  });
});