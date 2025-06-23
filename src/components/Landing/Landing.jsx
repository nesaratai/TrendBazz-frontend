import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllProducts } from '../../services/productService';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import './Landing.css';
import { Link } from 'react-router';

const Landing = () => {
  const [products, setProducts] = useState(null);
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        // Shuffle the product array
        const shuffled = data.sort(() => 0.5 - Math.random());
        setProducts(shuffled);
      } catch (error) {
        console.error('Error loading products:', error);
        setProducts([]);
      }
    };

    fetchProducts();
  }, []);

  return (
      <Container className="landing-container mt-4">
        <h1> Welcome to TrendBazz </h1><br></br>
  
        <Row className="landing-row">
          {products &&
            products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
                <Card className="landing-card">
                  <Link 
                  className="landing-card-link" 
                  to={`/products/${product._id}`} 
                  style={{ textDecoration: 'none', color: 'inherit' }}>
                  {product.img && (
                    <Card.Img 
                    variant="top" 
                    src={product.img} 
                    alt={product.name}
                    className="landing-card-img" />
                  )}
                  <Card.Body className="landing-card-body">
                    <Card.Title className="landing-card-title">
                      {product.name} — ${product.price.toFixed(2)}
                    </Card.Title>
                    <Card.Text className="landing-card-text">{product.description}</Card.Text>
                    {user?.role === 'Admin' && (
                      <Card.Text className="landing-card-stock">
                        <small>Stock: {product.stock}</small>
                      </Card.Text>
                    )}
                  </Card.Body>
                  </Link>
                  <Card.Footer>
                  <button
                      className="landing-btn-primary btn btn-primary"
                      disabled={!user}
                      onClick={() => addToCart(product)}>
                        {user ? 'Add to Cart':'Sign in to Add'}</button>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
        </Row>
      </Container>
  );
};

export default Landing;