const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/orders`;

// Create a new order
const createOrder = async (orderData) => {
    // Send a POST request to the backend to create a new order
  const res = await fetch(BASE_URL, {
    method: 'POST',
    // Set the request headers to send JSON
    headers: { 'Content-Type': 'application/json' },
    // Convert order data to JSON string and send in body
    body: JSON.stringify(orderData),
  });
  if (!res.ok) throw new Error('Failed to create order');
  // Return the response as JSON
  return res.json();
};

// Fetch orders by userId
const getUserOrders = async (userId) => {
    // Send GET request to fetch orders for a specific user by ID
    const res = await fetch(`${BASE_URL}/user/${userId}`);
    if (!res.ok) throw new Error('Failed to fetch orders');
    // Return the response as JSON
    return res.json();
  };
// Export Service
export {createOrder, getUserOrders}