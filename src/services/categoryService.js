const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/categories`;

// Get all categories
const getAllCategories = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch categories');
    return await response.json();
  } catch (error) {
    console.error('Cannot Get all Categories!', error);
    throw error;
  }
};

// Get a single category by ID
const getCategoryById = async (id) => {
  try {
    const response = await fetch(`${BASE_URL}/${id}`);
    if (!response.ok) throw new Error('Category not found');
    return await response.json();
  } catch (error) {
    console.error('Failed to get category:', error);
    throw error;
  }
};

// Add a new category
const addCategory = async (categoryData) => {
  try{
    const res = await fetch(BASE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(categoryData),});

  if (!res.ok) throw new Error('Failed to add category');
  return res.json();
  } catch (error) {
  console.error('Failed to to add Category:', error);
  return { success: false, error: error.message };
  }
};

// Update category by ID
const updateCategory = async (id, data) => {
  try{
    const res = await fetch(`${BASE_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error('Failed to update category');
    return res.json();
  } catch (error) {
    console.error('Failed to update category:', error);
    return { success: false, error: error.message };
  }
};

// Delete category by ID
const deleteCategory = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/${id}`, { method: 'DELETE' });
    if (!res.ok) throw new Error('Failed to delete category');
    return res.json();
  } catch (error) {
    console.error('Failed to delete category:', error);
    return { success: false, error: error.message };
  } 
};

export {
  getAllCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  getCategoryById
};