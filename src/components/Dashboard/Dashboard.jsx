import { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Button, Card, Table, Form } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { useNavigate } from 'react-router';
import { useProduct } from '../../contexts/ProductContext';
import * as userService from '../../services/userService';
import './Dashboard.css'
const Dashboard = () => {
  // Get product list and delete function from ProductContext
  const { products, deleteProduct } = useProduct();
  // Get current user from context
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState('');
  const navigate = useNavigate();
  // Find the selected product using its ID
  const selectedProduct = products.find(p => p._id === selectedProductId);
  const [showConfirm, setShowConfirm] = useState(false);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Call the userService to get all user
        const fetchedUsers = await userService.index();
        // Store fetched users in local state
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err);
      }
    };
    if (user) fetchUsers();
  }, [user]);

  return (
    <Container className="mt-4">
      <div className="dashboard-welcome">
        <h1>
          Welcome <strong><em>{user.lname}, {user.fname}</em></strong>
        </h1>
        <p>
          This is the dashboard page where you can see a list of all the users' information and you can edit or delete products and categories.
        </p>
      </div>
      <Row className="mt-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product Management</Card.Title>
              <Button
                variant="primary"
                className="dashboard-btn dashboard-btn-primary me-2 mb-3"
                onClick={() => navigate('/add-product')}
              >
                Add New Product
              </Button>

              <Form.Select
                className="mb-3"
                value={selectedProductId}
                onChange={(e) => setSelectedProductId(e.target.value)}
              >
                <option value="">-- Select a product --</option>
                {products.map(product => (
                  <option key={product._id} value={product._id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>

              {selectedProduct && (
                <>
                  <p><strong>Selected:</strong> {selectedProduct.name}</p>
                  <Button
                    variant="warning"
                    className="dashboard-btn dashboard-btn-warning me-2 mb-2"
                    onClick={() => navigate(`/edit-product/${selectedProduct._id}`)}
                  >
                    Edit Product
                  </Button>
                  <Button
                    variant="danger"
                    className="dashboard-btn dashboard-btn-danger me-2 mb-2"
                    onClick={() => setShowConfirm(true)}
                  >
                    Delete Product
                  </Button>

                  {showConfirm && (
                    <div className="mt-2">
                      <p>Are you sure you want to delete <strong>{selectedProduct?.name}</strong>?</p>
                      <Button variant="outline-danger" size="sm"className="me-2"
                        onClick={() => {
                          deleteProduct(selectedProduct._id);
                          setSelectedProductId('');
                          setShowConfirm(false);
                        }}
                      >
                        Yes
                      </Button>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => setShowConfirm(false)}
                      >
                        No
                      </Button>
                    </div>
                  )}
                </>
              )}
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Category Management</Card.Title>
              <Button variant="primary" className="me-2 mb-2">Add New Category</Button>
              <Button variant="warning" className="me-2 mb-2">Edit Category</Button>
              <Button variant="danger" className="mb-2">Delete Category</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <h2 className="mt-5">All Users</h2>
      <Table striped bordered hover responsive className="mt-3">
        <thead>
          <tr>
            <th>#</th>
            <th>Fullname</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan="5" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.fname} {u.lname}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;