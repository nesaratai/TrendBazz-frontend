import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';
import { getProductsByCategory } from '../../services/productService';
import { UserContext } from '../../contexts/UserContext';
import { Link } from 'react-router';

const Category = () => {
  const { categoryName } = useParams();
  const { addToCart } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useContext(UserContext);

  useEffect(() => {
    // Define a functionf to fetch products by category
    const fetchProducts = async () => {
      try {
        // Set loading state
        setLoading(true);
        // Fetch products by the current category name
        const data = await getProductsByCategory(categoryName);
        // Update state
        setProducts(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    // Call the function upon changes
    fetchProducts();
  }, [categoryName]);

  return (
    <Container className="landing-container my-4">
      <h2 className="mb-4 text-capitalize">{categoryName} Products</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert variant="info">No products found in this category.</Alert>
      ) : (
        <Row className="landing-row">
          {products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
                 <Card className="landing-card">
                  <Link 
                  className="landing-card-link" 
                  to={`/products/categories/${product._id}`} 
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
                      className="landing-btn-primary"
                      disabled={!user}
                      onClick={() => addToCart(product)}>
                        {user ? 'Add to Cart':'Sign in to Add'}</button>
                  </Card.Footer>
                </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Category;