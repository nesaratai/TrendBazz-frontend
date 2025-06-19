const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/categories`;

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

export {
  getAllCategories,
};