import React, { useState, useEffect } from 'react';
import './App.css';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import { UserProvider } from './context/UserContext';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Pārbaudīt, vai lietotājs jau ir pieslēdzies
    const savedUser = localStorage.getItem('vortex_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    setIsLoggedIn(true);
    localStorage.setItem('vortex_user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setIsLoggedIn(false);
    localStorage.removeItem('vortex_user');
  };

  return (
    <UserProvider>
      <div className="app">
        {isLoggedIn ? (
          <Dashboard user={currentUser} onLogout={handleLogout} />
        ) : (
          <LoginPage onLogin={handleLogin} />
        )}
      </div>
    </UserProvider>
  );
}

export default App;
