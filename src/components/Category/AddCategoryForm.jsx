import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap';
import * as categoryService from '../../services/categoryService';

const AddCategoryForm = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) return;

    try {
      await categoryService.addCategory({ name, description });
      setName('');
      setDescription('');
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to add category:', err.message);
    }
  };

  return (
    <Container className="my-4" style={{ maxWidth: '500px' }}>
      <h2 className="mb-4">Add New Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="categoryDescription">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter category description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </Container>
  );
};

export default AddCategoryForm;