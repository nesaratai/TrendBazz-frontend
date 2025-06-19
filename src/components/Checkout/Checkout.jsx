import { useContext, useState } from 'react';
import { Container, Row, Col, Table, Form, Button, Alert } from 'react-bootstrap';
import { CartContext } from '../../contexts/CartContext';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { createOrder } from '../../services/orderService';

const Checkout = () => {
    // Get cart items and clearCart function from context
    const { cartItems, clearCart } = useContext(CartContext);
    // Get current user from context
    const { user } = useContext(UserContext);
    // Make form state using user's info if available
    const [form, setForm] = useState({
        name: user?.fname + ' ' + user?.lname || '',
        email: user?.email || '',
        address: '',
        cardName: '',
        cardNumber: '',
        expiry: '',
        cvv: ''
    });
    // Make submission state
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();
    // Calculate total price from cart items
    const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const handleInputChange = (e) => {
        setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Create payload for backend order
            const orderPayload = {
                userId: user._id,
                orderDate: new Date(),
                status: 'Pending',
                totalPrice: totalPrice,
                items: cartItems.map(item => ({
                    productId: item._id,
                    name: item.name,
                    price: item.price,
                    quantity: item.quantity
                })),
                shippingDetails: {
                    name: form.name,
                    email: form.email,
                    address: form.address
                }
            };
        // Send order to backend
        await createOrder(orderPayload);
        // Set submitted to true and clear the cart
        setSubmitted(true);
        clearCart();
        // Redirect after delay
        setTimeout(() => {
            navigate('/profile');
        }, 3000);
        } catch (error) {
        console.error('Checkout failed:', error.message);
        }
    };
    // Show confirmation if order is placed
    if (submitted) {
        return (
        <Container className="mt-5">
            <Alert variant="success">Order placed successfully! Redirecting...</Alert>
        </Container>
        );
    }
    
    return (
        <Container className="mt-5">
        <h2 className="mb-4">Checkout</h2>

        {cartItems.length === 0 ? (
            <Alert variant="info">Your cart is empty.</Alert>
        ) : (
            <Row>
            <Col md={7}>
                <h4>Billing Information</h4>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Full Name</Form.Label>
                    <Form.Control
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                    name="address"
                    as="textarea"
                    rows={3}
                    value={form.address}
                    onChange={handleInputChange}
                    required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Cardholder Name</Form.Label>
                    <Form.Control
                        name="cardName"
                        type="text"
                        value={form.cardName}
                        onChange={handleInputChange}
                        required
                    />
                    </Form.Group>

                    <Form.Group className="mb-3">
                    <Form.Label>Card Number</Form.Label>
                    <Form.Control
                        name="cardNumber"
                        type="text"
                        inputMode="numeric"
                        maxLength="16"
                        placeholder="1234 5678 9012 3456"
                        value={form.cardNumber}
                        onChange={handleInputChange}
                        required
                    />
                    </Form.Group>

                    <Row>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>Expiry Date</Form.Label>
                        <Form.Control
                            name="expiry"
                            type="text"
                            placeholder="MM/YY"
                            value={form.expiry}
                            onChange={handleInputChange}
                            required
                        />
                        </Form.Group>
                    </Col>
                    <Col md={6}>
                        <Form.Group className="mb-3">
                        <Form.Label>CVV</Form.Label>
                        <Form.Control
                            name="cvv"
                            type="password"
                            maxLength="4"
                            placeholder="123"
                            value={form.cvv}
                            onChange={handleInputChange}
                            required
                        />
                        </Form.Group>
                    </Col>
                    </Row>
                <Button variant="success" type="submit">Place Order</Button>
                </Form>
            </Col>

            <Col md={5}>
                <h4>Order Summary</h4>
                <Table bordered hover>
                <thead>
                    <tr>
                    <th>Product</th>
                    <th>Qty</th>
                    <th>Price</th>
                    </tr>
                </thead>
                <tbody>
                    {cartItems.map((item) => (
                    <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>${(item.price * item.quantity).toFixed(2)}</td>
                    </tr>
                    ))}
                </tbody>
                </Table>
                <h5>Total: ${totalPrice.toFixed(2)}</h5>
            </Col>
            </Row>
        )}
        </Container>
    );
};

export default Checkout;