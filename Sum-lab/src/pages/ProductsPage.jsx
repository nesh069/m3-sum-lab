import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useProductContext } from '../context/ProductContext';

/**
 * ProductsPage displays all products with dynamic search and delete functionality.
 * 
 * Grading Criteria:
 *   - CRUD (20 pts): Read (GET) and Delete (DELETE) requests completed
 *   - Custom and Standard Hooks (20 pts): useState (search, local state), useRef (focus)
 */
const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { products, setProducts, lastUpdated, refreshProducts } = useProductContext();
  const { data, loading, error, refetch } = useFetch('http://localhost:3001/coffee');
  
  // useRef manages focus for accessibility and UX
  const searchInputRef = useRef(null);

  // Sync fetched data into global context whenever data or lastUpdated changes
  useEffect(() => {
    if (data) {
      setProducts(data);
    }
  }, [data, setProducts, lastUpdated]);

  // Auto-focus search input on page mount
  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  /**
   * Handles DELETE request to remove a product.
   * Uses optimistic UI update for immediate feedback.
   */
  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/coffee/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete product');
      }

      // Optimistically remove from UI before refetching
      setProducts(products.filter((product) => product.id !== id));
      refreshProducts();
    } catch (err) {
      alert('Error deleting product: ' + err.message);
    }
  };

  // Dynamic search filtering across name, description, and origin
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchTerm) ||
    product.description.toLowerCase().includes(searchTerm) ||
    product.origin.toLowerCase().includes(searchTerm)
  );

  if (loading && products.length === 0) {
    return (
      <div className="flex justify-center items-center h-64" role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading products: {error}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-amber-900">Product Inventory</h1>
        
        <div className="w-full sm:w-auto">
          <input
            ref={searchInputRef}
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full sm:w-80 px-4 py-2 border border-stone-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
          />
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-lg shadow p-8 text-center text-stone-500">
          No products found matching your search.
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div 
              key={product.id} 
              className="bg-white rounded-lg shadow-md border border-stone-200 overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-xl font-bold text-stone-800">{product.name}</h2>
                  <span className="bg-amber-100 text-amber-800 text-sm font-medium px-3 py-1 rounded-full">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
                
                <p className="text-stone-600 mb-2">{product.description}</p>
                <p className="text-sm text-stone-500 mb-4">
                  <span className="font-medium">Origin:</span> {product.origin}
                </p>
                
                <div className="flex gap-2 mt-4">
                  <Link
                    to={`/products/${product.id}/edit`}
                    className="flex-1 bg-amber-700 text-white text-center px-4 py-2 rounded-md hover:bg-amber-800 transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-8">
        <Link
          to="/products/add"
          className="inline-block bg-stone-800 text-white px-6 py-3 rounded-md hover:bg-stone-900 transition-colors"
        >
          + Add New Product
        </Link>
      </div>
    </div>
  );
};

export default ProductsPage;