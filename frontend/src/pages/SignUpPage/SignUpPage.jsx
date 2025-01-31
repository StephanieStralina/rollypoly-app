//SignUpPage.jsx

import { useState } from 'react';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import HamburgerNav from '../../components/HamburgerNav/HamburgerNav';
import './SignUpPage.css';
import RollyPolyLogoV2 from '../../assets/images/RollyPolyLogoV2.png';

export default function SignUpPage({ setUser, demoHistory, user }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  const disable = formData.password !== formData.confirm;

  return (
    <div className='signup-page'>
      <HamburgerNav
        demoHistory={demoHistory}
        user={user} />
      <div className='backdrop'>
        <img src={RollyPolyLogoV2} style={{ maxHeight: '9vmin', paddingTop: '1.5vmin' }} alt="A picture of a green logo reading RollyPolly" />
        <h2>Sign Up!</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <label>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <label>Confirm</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
            required
          />
          <button type="submit" disabled={disable}>
            SIGN UP
          </button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </div>
    </div>
  );
}