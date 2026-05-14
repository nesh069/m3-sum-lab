import { createContext, useContext, useState, useCallback } from 'react';

const ProductContext = createContext(null);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [storeInfo, setStoreInfo] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(Date.now());

  // useCallback ensures stable reference for dependency arrays
  const refreshProducts = useCallback(() => {
    setLastUpdated(Date.now());
  }, []);

  const value = {
    products,
    setProducts,
    storeInfo,
    setStoreInfo,
    lastUpdated,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>
      {children}
    </ProductContext.Provider>
  );
};

// Custom consumer hook with safety check for null context
export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};