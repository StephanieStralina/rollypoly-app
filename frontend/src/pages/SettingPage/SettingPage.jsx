//SettingsPage.jsx
import { useState } from 'react';
import * as authService from '../../services/authService';
import AppFooter from "../../components/AppFooter/AppFooter";
import './SettingPage.css'

export default function SettingPage({ user, setUser, handleLogOut }) {
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
    <div className='settings-page'>
      <div className='backdrop'>
        <h2>Update Your Settings</h2>
        <p>&nbsp;{message}</p>
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
          <label>New Password (Optional)</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <label>Confirm New Password</label>
          <input
            type="password"
            name="confirm"
            value={formData.confirm}
            onChange={handleChange}
          />
          <button type="submit">Update</button>
        </form>
        <AppFooter user={user} setUser={setUser} handleLogOut={handleLogOut} className="footer" />
      </div>
    </div>
  )
}