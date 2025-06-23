import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignupPage from '../pages/SignUpPage';
import ChatPage from '../pages/ChatPage';
import LoginPage from '../pages/LoginPage';

function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/chat" element={<ChatPage />} />
      </Routes>
    </Router>
  );
}

export default AppRouter; 
