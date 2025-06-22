import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Form, Button, Container } from 'react-bootstrap';
import * as categoryService from '../../services/categoryService';

const EditCategoryForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [categoryName, setCategoryName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const category = await categoryService.getCategoryById(id);
        setCategoryName(category.name);
        setDescription(category.description || '');
      } catch {
        // silently ignore errors here
      }
    };
    fetchCategory();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await categoryService.updateCategory(id, { name: categoryName, description });
      navigate('/dashboard');
    } catch {
      // silently ignore errors here
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName" className="mb-3">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="categoryDescription" className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter category description"
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditCategoryForm;