// Load cart from localStorage
const loadCartFromStorage = () => {
  // Get the cart data (as a JSON string) from localStorage
  const stored = localStorage.getItem('cartItems');
  // If there is stored data, parse it into JSON; otherwise return an empty array
  return stored ? JSON.parse(stored) : [];
  };
  
  // Save cart to localStorage
  const saveCartToStorage = (cartItems) => {
    // Convert cart items into a JSON string and store them in localStorage
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };
  
  // Export service 
  export {
    loadCartFromStorage, 
    saveCartToStorage, 
  };