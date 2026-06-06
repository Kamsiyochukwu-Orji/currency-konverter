import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Converter from './pages/Converter';
import Rates from './pages/Rates';
import History from './pages/History';
import './index.css';
import './responsive.css'

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Converter />} />
          <Route path="/rates" element={<Rates />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}
