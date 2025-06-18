import { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { getAllProducts } from '../../services/productService';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

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
   
      <Container className="mt-4">
        <h1> Welcome to TrendBazz </h1><br></br>
  
        <Row>
          {products &&
            products.map((product) => (
              <Col key={product._id} xs={12} sm={6} md={4} lg={3} className="mb-4">
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
      </Container>
  );
};

export default Landing;