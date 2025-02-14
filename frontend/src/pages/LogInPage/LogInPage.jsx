//LogInPage.jsx

import { useState } from 'react';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import HamburgerNav from '../../components/HamburgerNav/HamburgerNav';
import './LogInPage.css';
import RollyPolyLogoV2 from '../../assets/images/RollyPolyLogoV2.png';

export default function LogInPage({ setUser, demoHistory, user }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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
      const user = await authService.logIn(formData);
      setUser(user);
      navigate('/dashboard');
    } catch (err) {
      console.log(err);
      setErrorMsg('Log In Failed - Try Again');
    }
  }

  return (
    <div className='login-page'>
      <HamburgerNav
        demoHistory={demoHistory}
        user={user} />
      <div className='backdrop'>
        <img src={RollyPolyLogoV2} style={{ maxHeight: '9vmin', paddingTop: '1.5vmin' }} alt="A picture of a green logo reading RollyPolly" />
        <h2>Log In!</h2>
        <form autoComplete="off" onSubmit={handleSubmit}>
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
          <button type="submit">LOG IN</button>
        </form>
        <p className="error-message">&nbsp;{errorMsg}</p>
      </div>
    </div>
  );
}