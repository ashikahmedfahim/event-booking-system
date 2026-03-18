import { BrowserRouter, Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import AuthPage from './pages/Auth';
import MainNavigation from './components/Navigation/MainNavigation';
import './App.css';
import AuthContext from './context/auth-context';
import { useContext } from 'react';

function App() {
  const authContext = useContext(AuthContext);
  const isLoggedIn = authContext.isLoggedIn;

  return (
    <BrowserRouter>
      <MainNavigation />
      <div className="app-container">
        <Routes className="app-container">
          <Route path="/" element={<h1>Welcome to the Event Booking System</h1>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
