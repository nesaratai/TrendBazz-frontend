
import { Form, Button, Container } from 'react-bootstrap';
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router';
import './SignInForm.css';
import { signIn } from '../../services/authService';

import { UserContext } from '../../contexts/UserContext';
import { singleUser } from '../../services/userService';

const SignInForm = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);
  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (evt) => {
    setMessage('');
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
  };
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    try {
      // This function doesn't exist yet, but we'll create it soon.
      // It will cause an error right now
      const signedInUser = await signIn(formData);
      setUser(signedInUser);
      navigate('/');
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <main className="page-bg">
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Sign In</p>
        <p className="message">{message || 'Welcome back!'}</p>

        <label>
          <input
            className="input"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <span>Username</span>
        </label>

        <label>
          <input
            className="input"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <span>Password</span>
        </label>

        <button className="submit" type="submit">Sign In</button>

        <p className="signin">
          Don't have an account? <a href="/signup">Register</a>
        </p>
      </form>
    </main>
  );
};

export default SignInForm;

