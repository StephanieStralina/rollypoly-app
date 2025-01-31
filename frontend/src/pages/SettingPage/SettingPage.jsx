//SettingsPage.jsx
import { useState } from 'react';
import * as authService from '../../services/authService';
import './SettingPage.css'
import AppFooter from '../../components/AppFooter/AppFooter';

export default function SettingPage({ user, setUser, handleLogOut, userHistory, demoHistory }) {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    password: '',
    confirm: '',
  });
  const [message, setMessage] = useState('');

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setMessage('');
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (formData.password && formData.password !== formData.confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const updatedUser = await authService.updateUser(formData);
      setUser(updatedUser);
      setMessage('User succesfully updated')
      setFormData({
        ...formData,
        password: '',
        confirm: '',
      })
    } catch (err) {
      console.log(err);
      setMessage('Update Failed - Try Again');
    }
  }

  return (
    <div className="settings-page">
    <h2>Update Your Settings</h2>
    <p className="alert-message">{message}</p>
    <form className="settings-form" autoComplete="off" onSubmit={handleSubmit}>
      <div className="form-field">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-field">
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="form-field">
        <label>New Password (Optional)</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      <div className="form-field">
        <label>Confirm New Password</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Update</button>
    </form>
    <AppFooter className="settings-footer" handleLogOut={handleLogOut} user={user} setUser={setUser}/>
  </div>
  )
}