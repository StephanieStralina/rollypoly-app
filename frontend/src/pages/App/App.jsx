import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import { getUser, logOut } from '../../services/authService';
import * as formulaService from '../../services/formulaService';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import RollerPage from '../RollerPage/RollerPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import SettingPage from '../SettingPage/SettingPage';
import FormulaPage from '../FormulaPage/FormulaPage';



export default function App() {
  const [user, setUser] = useState(getUser());
  const [die, setDie] = useState(20);
  const [formulas, setFormulas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    const fetchUserFormulas = async () => {
      const formulasData = await formulaService.index();
      setFormulas(formulasData);
    };
    if (user) fetchUserFormulas();
  }, [user]);


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
          <Route path="/" element={user ? (<Navigate to="/dashboard" replace />) : (<LandingPage user={user} setUser={setUser} die={die} />)} />
          <Route path="/demo" element={<RollerPage die={die} />} />
          <Route path="/signup" element={<SignUpPage setUser={setUser} />} />
          <Route path="/login" element={<LogInPage setUser={setUser} />} />

          <Route path="/dashboard"
            element={user ? (
              <RollerPage
                user={user}
                setUser={setUser}
                handleLogOut={handleLogOut}
                die={die}
                formulas={formulas}
                addFormula={addFormula}
                toggleModal={toggleModal}
                modalIsOpen = {modalIsOpen}
              />
            ) : (
              <Navigate to="/" replace />
            )}
          />
          <Route path="/settings"
            element={user ? (
              <SettingPage
                user={user}
                setUser={setUser}
                handleLogOut={handleLogOut}
              />
            ) : (
              <Navigate to="/" replace />
            )}
          />
          <Route path="/formulas"
            element={user ? (
              <FormulaPage
                user={user}
                setUser={setUser}
                handleLogOut={handleLogOut}
                formulas={formulas}
                setFormulas={setFormulas}
                addFormula={addFormula}
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
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