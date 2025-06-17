import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { useContext } from 'react';

import { UserContext } from '../../contexts/UserContext';


const SignUpForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    passwordConf: '',
  });

  const { username, password, passwordConf } = formData;

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };


  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      const newUser = await signUp(formData);
      setUser(newUser);
      navigate('/');

      console.log(newUser);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const isFormInvalid = () => {
    return !(username && password && password === passwordConf);
  };

  return (
    <main>
      <Container style={{ maxWidth: '500px' }}>
        <h1 className="my-4">Sign Up</h1>
        <p>{message}</p>
  
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <Form.Group className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              name="passwordConf"
              value={passwordConf}
              onChange={handleChange}
              required
            />
          </Form.Group>
  
          <div className="d-flex justify-content-between">
            <Button variant="primary" type="submit" disabled={isFormInvalid()}>
              Sign Up
            </Button>
            <Button variant="secondary" onClick={() => navigate('/')}>
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </main>
  );
};

export default SignUpForm;
