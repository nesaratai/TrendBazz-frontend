import { useState, useContext } from 'react';
import { Container, Form, Button, InputGroup, Nav, Navbar, NavDropdown } from 'react-bootstrap';

import { Link } from 'react-router';
import { UserContext } from '../../contexts/UserContext';
import { CartContext } from '../../contexts/CartContext';
import './NavBar.css'; 
import logo from '../../assets/logo.png'

const NavBar = () => {
    // Get the setUser function from the UserContext
    const { user, setUser } = useContext(UserContext);
    const { cartItems } = useContext(CartContext);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const formattedTotal = total.toFixed(2);
    const [searchTerm, setSearchTerm] = useState('');
    // Add the handleSignOut function
    const handleSignOut = () => {
      // Clear the token from localStorage
      localStorage.removeItem('token');
      // Clear the user state
      setUser(null);
    };
  
    const handleSearch = (e) => {
      e.preventDefault();
        setSearchTerm('');
    };

    return (
      <>
      <Navbar expand="lg" className="navbar luxury" variant="light">
        <Container>
          <Navbar.Brand href="/" className="d-flex align-items-center">
            <img
              src={logo}
              alt="TrendBazz Logo"
              width="50"
              height="50"
              className="d-inline-block align-top me-2"
            />
            TrendBazz
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="ms-auto align-items-center">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <NavDropdown title="Store" id="store-dropdown">
                <NavDropdown.Item as={Link} to="/category/electronics">Electronics</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/fashion">Fashion</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/home">Home & Garden</NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/category/home">Books</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link as={Link} to="/about">About Us</Nav.Link>
  
              {user ? (
                <>
                <Nav.Link as={Link} to="/profile">My Account</Nav.Link>
                {user.role === 'Admin' && (
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                )}
                <Nav.Link as={Link} to="/cart" className="ms-3">
                🛒 Cart: ${formattedTotal}</Nav.Link>
                <Nav.Link as={Link} to="/"onClick={handleSignOut}>Sign Out</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link as={Link} to="/sign-in">Sign In</Nav.Link>
                  <Nav.Link as={Link} to="/sign-up">Sign Up</Nav.Link>
                </>
              )}
  
              {/* Cart with total */}

            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className="bg-light py-2 border-bottom">
  <Container>
    <Form onSubmit={handleSearch}>
      <div className="d-flex justify-content-end">
        <InputGroup style={{ maxWidth: '250px' }}>
          <Form.Control
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="form-control-sm"
          />
          <Button
            type="submit"
            variant="primary"
            className="btn-sm"
          >
            Search
          </Button>
        </InputGroup>
      </div>
    </Form>
  </Container>
</div>
    </>
    );
  };

  export default NavBar;