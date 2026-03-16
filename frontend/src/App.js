import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AuthPage from './pages/Auth';
import MainNavigation from './components/Navigation/MainNavigation';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <MainNavigation />
      <div className="app-container">
        <Routes className="app-container">
          <Route path="/" element={<div>Home Page</div>} />
          <Route path="/auth" element={<AuthPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
