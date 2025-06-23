import { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { getProductById } from '../../services/productService';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart } = useContext(CartContext);
  const { user } = useContext(UserContext);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await getProductById(productId);
        setProduct(data);
      } catch (err) {
        console.err('Failed to Fetch Products', err)
        setProduct(null);
      }
    };

    fetchProduct();
  }, [productId]);
  if (!product) return null;

  return (
    <Container className="mt-4">
      <Row className="align-items-center">
        <Col md={6}>
          <h2>{product.name}</h2>
          <p>{product.description}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          {user?.role === 'Admin' && (
          <p><strong>Stock:</strong> {product.stock}</p>
          )}
          <Button
            variant="primary"
            onClick={() => addToCart(product)}
            disabled={!user}
          >
            {user ? 'Add to Cart' : 'Sign in to Add'}
          </Button>
        </Col>

        <Col md={6} className="text-center">
          {product.img && (
            <img
              src={product.img}
              alt={product.name}
              style={{
                width: '300px',
                height: '300px',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;