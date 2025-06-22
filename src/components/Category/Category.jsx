import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';
import { getProductsByCategory } from '../../services/productService';
import { UserContext } from '../../contexts/UserContext';

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
    <Container className="my-4">
      <h2 className="mb-4 text-capitalize">{categoryName} Products</h2>
      {loading ? (
        <Spinner animation="border" />
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : products.length === 0 ? (
        <Alert variant="info">No products found in this category.</Alert>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} md={4} className="mb-4">
                 <Card>
                  {product.img && (
                    <Card.Img variant="top" src={product.img} alt={product.name} />
                  )}
                  <Card.Body>
                    <Card.Title>
                      {product.name} — ${product.price.toFixed(2)}
                    </Card.Title>
                    <Card.Text>{product.description}</Card.Text>
                    <Card.Text>
                      <small>Stock: {product.stock}</small>
                    </Card.Text>
                    <button
                      className="btn btn-primary"
                      disabled={!user}
                      onClick={() => addToCart(product)}>
                        {user ? 'Add to Cart':'Sign in to Add'}</button>
                  </Card.Body>
                </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default Category;