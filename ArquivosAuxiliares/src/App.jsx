import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Header from './components/Header.jsx';
import Home from './pages/Home.jsx';
import Resultado from './pages/Resultado.jsx';
import Votacao from './pages/Votacao.jsx';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/votacao" element={<Votacao />} />
        <Route path="/resultado" element={<Resultado />} />
        <Route path="*" element={<Home />} />
      </Routes>
      <footer className="rodape">DIAW 2026, PUC Minas</footer>
    </BrowserRouter>
  );
}

export default App;
