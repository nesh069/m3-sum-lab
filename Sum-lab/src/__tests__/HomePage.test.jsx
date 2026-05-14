import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi } from 'vitest';
import { ProductProvider } from '../context/ProductContext';
import HomePage from '../pages/HomePage';

const mockStoreInfo = [
  {
    id: 1,
    name: 'Coffee R Us',
    description: 'The go to store for coffee',
    phone_number: '555-5555',
  },
];

describe('HomePage', () => {
  beforeEach(() => {
    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockStoreInfo),
      })
    );
  });

  it('renders loading state initially', () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <HomePage />
        </ProductProvider>
      </BrowserRouter>
    );
    
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('displays store information after loading', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <HomePage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('Coffee R Us')).toBeInTheDocument();
    });
    
    expect(screen.getByText('The go to store for coffee')).toBeInTheDocument();
    expect(screen.getByText('555-5555')).toBeInTheDocument();
  });

  it('renders navigation links to products and add product pages', async () => {
    render(
      <BrowserRouter>
        <ProductProvider>
          <HomePage />
        </ProductProvider>
      </BrowserRouter>
    );

    await waitFor(() => {
      expect(screen.getByText('View Products')).toBeInTheDocument();
    });
    
    expect(screen.getByText('Add New Product')).toBeInTheDocument();
  });
});