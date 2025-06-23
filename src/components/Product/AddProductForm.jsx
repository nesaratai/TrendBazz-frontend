import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import { getAllCategories } from '../../services/categoryService';
import { addProduct } from '../../services/productService';

const AddProductForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(err => console.error('Failed to load categories:', err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await addProduct(formData);

    if (result.success) {
      setMessage({ type: 'success', text: 'Product added successfully!' });
      setFormData({
        name: '',
        description: '',
        price: '',
        stock: '',
        img: '',
        category_id: '',
      });
    } else {
      setMessage({ type: 'danger', text: result.error || 'Failed to add product.' });
    }

    setTimeout(() => setMessage({ type: '', text: '' }), 5000);
  };

  return (
    <Container className="my-4">
      <h2>Add New Product</h2>

      {message.text && (
        <Alert variant={message.type} dismissible onClose={() => setMessage({ type: '', text: '' })}>
          {message.text}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group controlId="price" className="mb-3">
              <Form.Label>Price ($)</Form.Label>
              <Form.Control
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="stock" className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group controlId="img" className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="category_id" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
            required
          >
            <option value="">-- Select a category --</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button type="submit" variant="primary">Add Product</Button>
      </Form>
    </Container>
  );
};

export default AddProductForm;