import { Link } from 'react-router';
import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';

const NavBar = () => {
    // Get the setUser function from the UserContext
    const { user, setUser } = useContext(UserContext);
  
    // Add the handleSignOut function
    const handleSignOut = () => {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Clear the user state
      setUser(null);
    };
  
    return (
      <nav>
        {user ? (
          <ul>
            <li>Welcome, {user.username}</li>
            <li><Link to='/'>Dashboard</Link></li>
            <li><Link to='/' onClick={handleSignOut}>Sign Out</Link></li>
          </ul>
        ) : (
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to="/sign-in">Sign In</Link></li>
            <li><Link to='/sign-up'>Sign Up</Link></li>
          </ul>
        )}
      </nav>
    );
  };

  export default NavBar;