//App.jsx

import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router';
import { getUser, logOut } from '../../services/authService';
import * as formulaService from '../../services/formulaService';
import * as groupService from '../../services/groupService';
import './App.css';
import LandingPage from '../LandingPage/LandingPage';
import RollerPage from '../RollerPage/RollerPage';
import SignUpPage from '../SignUpPage/SignUpPage';
import LogInPage from '../LogInPage/LogInPage';
import SettingPage from '../SettingPage/SettingPage';
import FormulaPage from '../FormulaPage/FormulaPage';



export default function App() {
  const [user, setUser] = useState(getUser());
  const [userHistory, setUserHistory] = useState([]);
  const [demoHistory, setDemoHistory] = useState([]);
  const [die, setDie] = useState(20);
  const [formulas, setFormulas] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedFormula, setSelectedFormula] = useState(null);
  const [groupList, setGroupList] = useState([]);
  const [newGroup, setNewGroup] = useState('');
  const [filteredFormulas, setFilteredFormulas] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState('All Formulas');
  const [formulaData, setFormulaData] = useState({
    name: '',
    numDice: 1,
    diceSides: 20,
    modifier: 0,
    group: null,
  })
  const navigate = useNavigate();

  const toggleModal = () => setModalIsOpen(!modalIsOpen);

  useEffect(() => {
    const fetchUserFormulas = async () => {
      const formulasData = await formulaService.index();
      setFormulas(formulasData);
      setFilteredFormulas(formulasData);
    };
    const fetchGroups = async () => {
      try {
        const groups = await groupService.indexGroups();
        setGroupList(groups);
      } catch (e) {
        console.error("Error fetching groups:", e);
      }
    };
    if (user) {
      fetchUserFormulas();
      fetchGroups();
    }
  }, [user, formulas.length]);

  useEffect(() => {
    if (selectedGroup === 'All Formulas') {
      setFilteredFormulas(formulas);
    } else {
      setFilteredFormulas(formulas.filter(formula => formula.group && formula.group._id === selectedGroup));
    }
  }, [selectedGroup, formulas]);


  async function handleLogOut() {
    logOut();
    setUser(null);
    setFormulas([]);
    setGroupList([]);
    navigate('/');
  }

  const handleModalClose = () => {
    setSelectedFormula(null);
    toggleModal();
  };

  const addFormula = async (formattedFormulaData) => {
    const newFormula = await formulaService.createFormula(formattedFormulaData);
    setFormulas([...formulas, newFormula]);
    handleModalClose();
  }

  const handleUpdateFormula = async (formulaId, formattedFormulaData) => {
    const updatedFormula = await formulaService.update(formulaId, formattedFormulaData);
    setFormulas(formulas.map((formula) => (formulaId === formula._id ? updatedFormula : formula)));
    handleModalClose();
  };

  const handleDeleteFormula = async (formulaId) => {
    try {
      const deletedFormula = await formulaService.deleteFormula(formulaId);
      setFormulas(formulas.filter((formula) => formula._id !== formulaId));
      handleModalClose();
      navigate('/formulas');
    } catch (e) {
      console.log('Error:', e);
    }
  };

  const handleNewGroupChange = (evt) => {
    setNewGroup(evt.target.value);
  };

  const handleAddNewGroup = async () => {
    if (newGroup) {
      try {
        const group = await groupService.createGroup({ name: newGroup });
        setGroupList([...groupList, group]);
        setNewGroup('');
        setFormulaData(formulaData => ({ ...formulaData, group: group._id || null }))
      } catch (error) {
        console.error("Error creating new group:", error);
      }
    }
  };

  const handleGroupFilterChange = (evt) => {
    setSelectedGroup(evt.target.value);
  };



  return (
    <main className="App">
      <section id="main-section">

        <Routes>
          <Route path="/" element={
            user ? (<Navigate to="/dashboard" replace />)
              : (<LandingPage user={user} setUser={setUser} die={die} />)} />
          <Route path="/demo" 
          element={<RollerPage 
              die={die} 
              setFormulaData={setFormulaData} 
              demoHistory={demoHistory}
              setDemoHistory={setDemoHistory}/>} />
          <Route path="/sign-up" element={
            <SignUpPage setUser={setUser} demoHistory={demoHistory} />} />
          <Route path="/login" element={<LogInPage setUser={setUser} user={user} demoHistory={demoHistory} />} />

          <Route path="/dashboard"
            element={user ? (
              <RollerPage
                user={user}
                setUser={setUser}
                userHistory={userHistory}
                setUserHistory={setUserHistory}
                handleLogOut={handleLogOut}
                die={die}
                formulas={filteredFormulas}
                addFormula={addFormula}
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
                groupList={groupList}
                newGroup={newGroup}
                handleNewGroupChange={handleNewGroupChange}
                handleAddNewGroup={handleAddNewGroup}
                selectedGroup={selectedGroup}
                handleGroupFilterChange={handleGroupFilterChange}
                formulaData={formulaData}
                setFormulaData={setFormulaData}
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
                userHistory={userHistory}
                demoHistory={demoHistory}
                setDemoHistory={setDemoHistory}
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
                formulas={filteredFormulas}
                setFormulas={setFormulas}
                addFormula={addFormula}
                toggleModal={toggleModal}
                modalIsOpen={modalIsOpen}
                handleModalClose={handleModalClose}
                selectedFormula={selectedFormula}
                setSelectedFormula={setSelectedFormula}
                handleUpdateFormula={handleUpdateFormula}
                handleDeleteFormula={handleDeleteFormula}
                groupList={groupList}
                newGroup={newGroup}
                handleNewGroupChange={handleNewGroupChange}
                handleAddNewGroup={handleAddNewGroup}
                selectedGroup={selectedGroup}
                handleGroupFilterChange={handleGroupFilterChange}
                formulaData={formulaData}
                setFormulaData={setFormulaData}
                userHistory={userHistory}
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