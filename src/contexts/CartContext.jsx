import { createContext, useState, useEffect } from 'react';
// Import service
import {
  loadCartFromStorage,
  saveCartToStorage,
} from '../services/cartService';

// Create a new context for the cart
const CartContext = createContext();

// Define the provider component
const CartProvider = ({ children }) => {
  // Initialize cartItems state from localStorage (if any)
  const [cartItems, setCartItems] = useState(() => loadCartFromStorage());

  useEffect(() => {
    // Save to localStorage on change
    saveCartToStorage(cartItems); 
  }, [cartItems]);

// Add items to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item._id === product._id);
      // If already in cart, increase the quantity
      return existing
        ? prev.map(item =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        : [...prev, { ...product, quantity: 1 }];
    });
  };

//Remove Item form cart
  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter(item => item._id !== id));
  };

// Clear Cart items
  const clearCart = () => {
    // Reset cartItems to empty array
    setCartItems([]);
  };

// Provide cart state and functions to all children components
  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartProvider, CartContext };