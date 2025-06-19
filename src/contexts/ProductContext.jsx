import { createContext, useContext, useState, useEffect } from 'react';
import {
  getAllProducts,
  addProduct as addProductService,
  deleteProduct as deleteProductService,
  updateProduct as updateProductService
} from '../services/productService';

// Create a new context for products
const ProductContext = createContext();
const useProduct = () => useContext(ProductContext);
// Provide the context to children components
const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

// Fetch all products from the backend and update local state
  const fetchProducts = async () => {
    try {
        // Call get all products
      const data = await getAllProducts();
      setProducts(data);
    } catch (error) {
      console.error('Failed to fetch products:', error);
    }
  };

// Add a new product
  const addProduct = async (productData) => {
    // Call add product
    const result = await addProductService(productData);
    // Refresh product list if added
    if (result.success) fetchProducts();
    return result;
  };

  // Delete a product by its ID
  const deleteProduct = async (id) => {
    try {
        // Call delete product
      await deleteProductService(id);
      // Refresh product list after deletion
      fetchProducts();
      return { success: true };
    } catch (err) {
      console.error('Delete failed', err);
      return { success: false, error: err.message };
    }
  };

// Update a product by ID and new data
  const updateProduct = async (id, data) => {
    try {
    // Call update product
      await updateProductService(id, data);
    // Refresh product list
      fetchProducts();
      return { success: true };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };
// Automatically load products when the component mounts
  useEffect(() => {
    fetchProducts();
  }, []);
// Provide product state and actions to components
  return (
    <ProductContext.Provider value={{ products, fetchProducts, addProduct, deleteProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export { ProductProvider, ProductContext, useProduct };