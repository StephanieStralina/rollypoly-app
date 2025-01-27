import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser, logOut } from '../../services/authService';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import RollerPage from '../RollerPage/RollerPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
}

  return (
    <main className="App">
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<RollerPage user={user} setUser={setUser} handleLogOut={handleLogOut} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
            <Route path="/demo" element={<RollerPage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}