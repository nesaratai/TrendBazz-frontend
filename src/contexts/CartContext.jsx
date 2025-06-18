import { createContext, useState, useEffect } from 'react';

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const stored = localStorage.getItem('cartItems');
    return stored ? JSON.parse(stored) : [];
  });

  // Sync with localStorage whenever cartItems change
  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);
  // add items to cart
  const addToCart = (product) => {
    setCartItems((prev) => {
      const existing = prev.find(item => item._id === product._id || item._id === product._id);
      if (existing) {
        return prev.map(item =>
          item._id === product._id || item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prev, { ...product, quantity: 1 }];
      }
    });
  };
 //Remove Item form cart
  const removeFromCart = (id) => {
    setCartItems((prev) =>
      prev.filter(item => item._id !== id && item._id !== id)
    );
  };
// Clear Cart items
  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
export {CartProvider, CartContext};