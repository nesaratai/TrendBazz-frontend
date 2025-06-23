import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import { getProductById, updateProduct } from '../../services/productService';
import { getAllCategories } from '../../services/categoryService';  // Import this

const EditProductForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    img: '',
    category_id: '',
  });

  const [categories, setCategories] = useState([]);  // Define categories state
  const [message, setMessage] = useState({ type: '', text: '' });

  // Fetch product by id
  useEffect(() => {
    getProductById(id)
      .then(data => setFormData(data))
      .catch(() => setMessage({ type: 'danger', text: 'Failed to load product.' }));
  }, [id]);

  // Fetch categories
  useEffect(() => {
    getAllCategories()
      .then(setCategories)
      .catch(() => setMessage({ type: 'danger', text: 'Failed to load categories.' }));
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await updateProduct(id, formData);
      navigate('/dashboard');
    } catch (error) {
      setMessage({ type: 'danger', text: error.message || 'Failed to update product.' });
    }
  };

  if (!formData) return <p>Loading...</p>;

  return (
    <Container className="my-4">
      <h2>Edit Product</h2>
      {message.text && <Alert variant={message.type}>{message.text}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="name" className="mb-3">
          <Form.Label>Product Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name || ''}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="description" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            name="description"
            value={formData.description || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="price" className="mb-3">
          <Form.Label>Price ($)</Form.Label>
          <Form.Control
            type="number"
            name="price"
            value={formData.price || ''}
            onChange={handleChange}
            required
            min="0"
            step="0.01"
          />
        </Form.Group>

        <Form.Group controlId="stock" className="mb-3">
          <Form.Label>Stock</Form.Label>
          <Form.Control
            type="number"
            name="stock"
            value={formData.stock || ''}
            onChange={handleChange}
            min="0"
          />
        </Form.Group>

        <Form.Group controlId="img" className="mb-3">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            type="text"
            name="img"
            value={formData.img || ''}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group controlId="category_id" className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            name="category_id"
            className="text-capitalize"
            value={formData.category_id || ''}
            onChange={handleChange}
            required
          >
            <option  value="">-- Select a category --</option>
            {categories.map(cat => (
              <option  key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update Product
        </Button>
      </Form>
    </Container>
  );
};

export default EditProductForm;