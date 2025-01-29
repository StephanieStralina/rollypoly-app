import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import { getUser, logOut } from '../../services/authService';
import * as formulaService from '../../services/formulaService';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import RollerPage from '../RollerPage/RollerPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';

const formulaTempArray = [
  {
    name: 'Attack',
    numDice: 1,
    diceSides: 20,
    modifier: 8,
    source: 'formula',
    formula: 1,
  },
  {
    name: 'Damage - Sword',
    numDice: 2,
    diceSides: 10,
    modifier: 5,
    source: 'formula',
    formula: 2,
  },
  {
    name: 'WIS Save',
    numDice: 1,
    diceSides: 20,
    modifier: 2,
    source: 'formula',
    formula: 3,
  },
]

export default function App() {
  const [user, setUser] = useState(getUser());
  const [die, setDie] = useState(20);
  const [formulas, setFormulas] = useState(formulaTempArray);
  const navigate = useNavigate();

  function handleLogOut() {
    logOut();
    setUser(null);
    navigate('/');
  }

  //TODO: Add onClick change die and dieImg for rolls

  const addFormula = async (formattedFormulaData) => {
    const newFormula = await formulaService.createFormula(formattedFormulaData);
    setFormulas([...formulas, newFormula]);
  }

  return (
    <main className="App">
      <section id="main-section">  

          <Routes>
          <Route path="/" element={<LandingPage user={user} setUser={setUser} die={die} />} />
          <Route path="/demo" element={<RollerPage die={die} />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
          <Route path="/login" element={<LogInPage setUser={setUser} />} />

          <Route
            path="/dashboard"
            element={user ? (
              <RollerPage
                user={user}
                setUser={setUser}
                handleLogOut={handleLogOut}
                die={die}
                formulas={formulas}
                addFormula={addFormula}
              />
            ) : (
              <Navigate to="/" replace />
            )}
          />
         </Routes>
      </section>
    </main>
  );
}