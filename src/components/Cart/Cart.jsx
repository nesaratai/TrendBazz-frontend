import { useContext } from 'react';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';

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

          <Button variant="secondary" onClick={clearCart} className="mt-3">
            Clear Cart
          </Button>
        </>
      )}
    </Container>
  );
};

export default Cart;