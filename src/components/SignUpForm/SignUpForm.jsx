import { Form, Button, Container } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { signUp } from '../../services/authService';
import { useContext } from 'react';
import './SignUpForm.css'
import { UserContext } from '../../contexts/UserContext';


const SignUpForm = () => {
  const navigate = useNavigate();

  const { setUser } = useContext(UserContext);

  const [message, setMessage] = useState('');
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    dob: '',
    email: '',
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
    <main className='page'>
      <form className="form" onSubmit={handleSubmit}>
        <p className="title">Register</p>
        <p className="message">Signup now and get full access to our app.</p>

        <div className="flex">
          <label>
            <input
              className="input"
              type="text"
              name="fname"
              value={formData.fname}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <span>Firstname</span>
          </label>
          <label>
            <input
              className="input"
              type="text"
              name="lname"
              value={formData.lname}
              onChange={handleChange}
              placeholder=" "
              required
            />
            <span>Lastname</span>
          </label>
        </div>

        <label>
          <input
            className="input"
            type="date"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            required
          />
          <span>Date of Birth</span>
        </label>

        <label>
          <input
            className="input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <span>Email</span>
        </label>

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

        <label>
          <input
            className="input"
            type="password"
            name="passwordConf"
            value={formData.passwordConf}
            onChange={handleChange}
            placeholder=" "
            required
          />
          <span>Confirm password</span>
        </label>

        <button className="submit" type="submit" disabled={isFormInvalid()}>
          Sign Up
        </button>

        <p className="signin">
          Already have an account? <a href="/">Signin</a>
        </p>
      </form>
    </main>
  );
};

export default SignUpForm;
