import { useContext } from 'react';
import { Container, ListGroup, Button, Image  } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';
import { Link } from 'react-router';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useContext(CartContext);

  return (
    <Container>
      <h1>List of your items</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ListGroup>
            {cartItems.map((item) => (
              <ListGroup.Item key={item._id}>
                    <Image
                  src={item.img}
                  alt={item.name}
                  style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '10px' }}
                  rounded
                />
                <strong>{item.name}</strong> — Quantity: {item.quantity} — ${item.price.toFixed(2)}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
          <div className="d-flex justify-content-between mt-3">
          <Button variant="secondary" onClick={clearCart} className="mt-3">
            Clear Cart
          </Button>
          <Button as={Link} to="/checkout" variant="success" className="mt-3">
            Checkout
          </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default Cart;