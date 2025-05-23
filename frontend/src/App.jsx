import './App.css'
import ChessTournaments from "./pages/TournamentsDashboard"
import TournamentDetail from "./pages/TournamentDetail";
import LandingPage from './pages/LandingPage';
import Register from './pages/Register';
import Login from './pages/Login';
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <main className="min-h-screen w-full">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/tournaments" element={<ChessTournaments />} />
        <Route path="/tournaments/:id" element={<TournamentDetail />} />
      </Routes>
    </main>
  );
}

export default App
