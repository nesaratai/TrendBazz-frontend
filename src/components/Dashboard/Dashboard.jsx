import { useEffect, useContext, useState } from 'react';
import { Container, Row, Col, Button, Card, Table } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';

import * as userService from '../../services/userService';

const Dashboard = () => {
  const { user } = useContext(UserContext);
  const [users, setUsers] = useState([]); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await userService.index();
        console.log(fetchedUsers);
        setUsers(fetchedUsers);
      } catch (err) {
        console.log(err)
      }
    }
    if (user) fetchUsers();
  }, [user]);

  return (
    <Container className="mt-4">
      <h1>Welcome, {user.username}</h1>
      <p>This is the dashboard page where you can see a list of all the users.</p>

      <Row className="mt-4">
        <Col md={6}>
          <Card className="mb-4">
            <Card.Body>
              <Card.Title>Product Management</Card.Title>
              <Button variant="primary" className="me-2 mb-2">Add New Product</Button>
              <Button variant="warning" className="me-2 mb-2">Edit Product</Button>
              <Button variant="danger" className="mb-2">Delete Product</Button>
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
              <td colSpan="4" className="text-center">No users found.</td>
            </tr>
          ) : (
            users.map((u, index) => (
              <tr key={u._id}>
                <td>{index + 1}</td>
                <td>{u.fname} {u.lname}</td>
                <td>{u.username}</td>
                <td>{u.email}</td>
                <td>{u.role} <Button variant="warning">Edit</Button></td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
};

export default Dashboard;