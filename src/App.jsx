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
import { UserContext } from './contexts/UserContext';
import AddProductForm from './components/Product/AddProductForm';
import EditProductForm from './components/Product/EditProductForm';
const App = () => {
  console.log(UserContext)
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      {/* Add the Routes component to wrap our individual routes*/}
      <Routes>
        <Route path='/' element={<Landing /> } />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        {user?.role === 'Admin' ? (
          <>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-product" element={<AddProductForm />} />
          <Route path="/edit-product/:id" element={<EditProductForm />} />
          </>
          ) : (
          // Redirect non-admin users away from /dashboard
          <>
          <Route path="/dashboard" element={<Navigate to="/" replace />} />
          
          </>
            )}
      </Routes>
    </>
  );
};

export default App;
