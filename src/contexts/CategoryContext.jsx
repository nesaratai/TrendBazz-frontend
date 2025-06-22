import { createContext, useContext, useState, useEffect } from 'react';
import {
    getAllCategories,
    addCategory as addCategoryService,
    deleteCategory as deleteCategoryService,
    updateCategory as updateCategoryService
} from '../services/categoryService'
import { data } from 'react-router';

//Create new context for products
const CategoryContext = createContext();
const useCategory = () => useContext(CategoryContext)

//provide the contex to children components
const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    // fetch all categories form backend and update local state
    const fetchCategories = async () => {
        try{
            // call get all categories
            const data = await getAllCategories();
            setCategories(data);
        } catch (error) {
            console.error('Falied to fetch categories', error)
        }
    };

    //add new category
    const addCategory = async (categoryData) => {
        const result = await addCategoryService(categoryData);
        if (result.success)
            fetchCategories();
            return result
    };

    // delete categories by id
    const deleteCategory = async (id) => {
        try {
            await deleteCategoryService(id)
            fetchCategories();
            return {success: true}
        } catch (error) {
            console.error('Delete Category Failed', error)
            return {success: false, error: error.message};
        }
    };

    //update category by ID and new data
    const updateCategory = async (id, data) => {
        try {
            await updateCategoryService(id, data);
            // refresh category in case of change
            fetchCategories();
            return {success: true}
        } catch (error) {
            console.error('Update failed', error)
            return {success: false, error: error.message};
        }
    };
    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <CategoryContext.Provider value={{categories, fetchCategories, addCategory,deleteCategory, updateCategory }}
        >
            {children}
        </CategoryContext.Provider>
    )

};

export { CategoryContext, CategoryProvider, useCategory};
