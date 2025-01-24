import { useState } from 'react';
import { Routes, Route } from 'react-router';
import { getUser } from '../../services/authService';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';

export default function App() {
  const [user, setUser] = useState(getUser());

  return (
    <main className="App">
      <section id="main-section">
        {user ? (
          <Routes>
            <Route path="/" element={<LandingPage user={user} setUser={setUser} />} />
          </Routes>
        ) : (
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
            <Route path="/login" element={<LogInPage setUser={setUser} />} />
          </Routes>
        )}
      </section>
    </main>
  );
}