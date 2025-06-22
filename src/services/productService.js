const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

// Get All Products
const getAllProducts = async () => {
  try {
    // Send a GET request to fetch all products
    const res = await fetch(BASE_URL);
    // If the response is not successful, throw an error
    if (!res.ok) throw new Error('Failed to fetch products');
    // Return the parsed JSON data
    return await res.json();
  } catch (error) {
    console.error('Cannot Get all Products!', error);
    throw error;
  }
};
// Add a New Product
const addProduct = async (productData) => {
  try {
    // Send a POST request to add a new product
    const res = await fetch(BASE_URL, {
      method: 'POST',
      // Set the request headers to send JSON
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    // If the response failed, get the error message
    if (!res.ok) {
      const text = await res.text();
      throw new Error(text || 'Failed to add product');
    }
    // Parse and return the newly added product
    const data = await res.json();
    return { success: true, data };
  } catch (error) {
    console.error('Failed to add product:', error);
    return { success: false, error: error.message };
  }
};
// Get Product by ID
const getProductById = async (id) => {
  // Send a GET request to fetch a specific product by ID
  const res = await fetch(`${BASE_URL}/${id}`);
  // If product not found, throw an error
  if (!res.ok) throw new Error('Product not found');
  // Return the response as JSON
  return res.json();
};

// Update Product by ID
const updateProduct = async (id, data) => {
  // Send a PUT request to update the product
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  // If update fails, get the error message
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to update');
  }
  // Return the response as JSON
  return res.json();
};

// Delete Product by ID
const deleteProduct = async (id) => {
  // Send a DELETE request to remove the product
  const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
  // If deletion fails, get the error message
  if (!res.ok) {
    const text = await res.text();
    throw new Error(text || 'Failed to delete');
  }
  return { success: true };
};


const getProductsByCategory = async (categoryName) => {
  const res = await fetch(`${BASE_URL}/category/${categoryName}`);
  console.log('Fetching from:', `${BASE_URL}/category/${categoryName}`);
  if (!res.ok) throw new Error('Failed to fetch products by category');
  return res.json();
};

// Export all services
export {
  getAllProducts,
  addProduct,
  getProductById,
  updateProduct,
  deleteProduct,
  getProductsByCategory
};