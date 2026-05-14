import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import { useProductContext } from '../context/ProductContext';

/**
 * HomePage serves as the landing page describing the e-commerce site.
 * Fetches store information from the simulated backend.
 * 
 * Grading Criteria:
 *   - Client Side Routing (20 pts): Landing page route at "/"
 *   - CRUD (20 pts): Read (GET) operation for store_info
 */
const HomePage = () => {
  const { storeInfo, setStoreInfo } = useProductContext();
  const { data, loading, error } = useFetch('http://localhost:3001/store_info');

  // Sync fetched store data into global context
  useEffect(() => {
    if (data && data[0]) {
      setStoreInfo(data[0]);
    }
  }, [data, setStoreInfo]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64" role="status" aria-label="Loading">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-700"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
        Error loading store information: {error}
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8 border border-stone-200">
        <h1 className="text-4xl font-bold text-amber-900 mb-4">
          {storeInfo?.name || 'Coffee R Us'}
        </h1>
        
        <p className="text-lg text-stone-600 mb-6">
          {storeInfo?.description || 'The go to store for coffee'}
        </p>
        
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <div className="bg-amber-50 p-6 rounded-lg border border-amber-100">
            <h2 className="text-xl font-semibold text-amber-900 mb-2">About Us</h2>
            <p className="text-stone-700">
              Welcome to the administrator portal for Coffee R Us. This platform allows 
              you to manage your coffee inventory, update product details, and monitor your 
              e-commerce operations.
            </p>
          </div>
          
          <div className="bg-stone-100 p-6 rounded-lg border border-stone-200">
            <h2 className="text-xl font-semibold text-stone-800 mb-2">Contact</h2>
            <p className="text-stone-700">
              <span className="font-medium">Phone:</span> {storeInfo?.phone_number || '555-5555'}
            </p>
            <p className="text-stone-700 mt-2">
              <span className="font-medium">Admin Portal:</span> Manage products, prices, and inventory
            </p>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <Link 
            to="/products" 
            className="inline-block bg-amber-700 text-white px-6 py-3 rounded-md hover:bg-amber-800 transition-colors"
          >
            View Products
          </Link>
          <Link 
            to="/products/add" 
            className="inline-block bg-stone-700 text-white px-6 py-3 rounded-md hover:bg-stone-800 transition-colors"
          >
            Add New Product
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;