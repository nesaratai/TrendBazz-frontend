import { Routes, Route } from 'react-router';
import { useContext } from 'react';
import NavBar from './components/NavBar/NavBar';
import SignInForm from './components/SignInForm/SignInForm';
import SignUpForm from './components/SignUpForm/SignUpForm';
import Landing from './components/Landing/Landing';
import Dashboard from './components/Dashboard/Dashboard';
import { UserContext } from './contexts/UserContext';

const App = () => {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavBar />
      {/* Add the Routes component to wrap our individual routes*/}
      <Routes>
        <Route path='/' element={user ? <Dashboard /> : <Landing /> } />
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path='/sign-up' element={<SignUpForm />} />
      </Routes>
    </>
  );
};

export default App;
