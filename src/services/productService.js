const BASE_URL = `${import.meta.env.VITE_BACK_END_SERVER_URL}/products`;

const getAllProducts = async () => {
  try {
    const response = await fetch(BASE_URL);
    if (!response.ok) throw new Error('Failed to fetch products');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Cannot Get all Products!', error);
    throw error;
  }
};

export {
    getAllProducts,
};

