import { Routes, Route } from 'react-router';
import { useContext } from 'react';
import { Navigate } from 'react-router';
import NavBar from './components/NavBar/NavBar';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import Profile from './components/Profile/Profile'
import Checkout from './components/Checkout/Checkout';
import Cart from './components/Cart/Cart';
import Footer from './components/Footer/Footer';
import Category from './components/Category/Category';
import { UserContext } from './contexts/UserContext';
import AddProductForm from './components/Product/AddProductForm';
import EditProductForm from './components/Product/EditProductForm';
import AddCategoryForm from './components/Category/AddCategoryForm';
import EditCategoryForm from './components/Category/EditCategoryForm';
import About from './components/AboutUs/AboutUs';
import './app.css'
const App = () => {
  console.log(UserContext)
  const { user } = useContext(UserContext);

  return (
    <div className="app-container">
  
      <NavBar />
      <main className="content">
      {/* Add the Routes component to wrap our individual routes*/}
      <Routes>
        <Route path='/' element={<Landing /> } />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/about" element={<About />} />
        <Route path="/category/:categoryName" element={<Category />} />
        {user?.role === 'Admin' ? (
          <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<EditProductForm />} />
          <Route path="/add-category" element={<AddCategoryForm />} />
          <Route path="/edit-category/:id" element={<EditCategoryForm />} />
          </>
          ) : (
          // Redirect non-admin users away from /dashboard
          <>
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          
          </>
            )}
      </Routes>
     
    </main>
     <Footer />
     </div>
  );
};

export default App;
