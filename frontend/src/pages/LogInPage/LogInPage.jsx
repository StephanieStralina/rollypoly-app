import { useState } from 'react';
import * as authService from '../../services/authService';
import { useNavigate } from 'react-router';
import AppFooter from '../../components/AppFooter/AppFooter';
import './LogInPageTemp.css';

export default function LogInPage({ setUser }) {
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
      <AppFooter className="footer"/>
    </div>
  );
}