import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import SplashPage from './pages/SplashPage';
import DashboardPage from './pages/DashboardPage';
import GarrafasPage from './pages/GarrafasPage';
import ExtrusaoPage from './pages/ExtrusaoPage';
import EstoquePage from './pages/EstoquePage';
import RelatorioPage from './pages/RelatorioPage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<SplashPage />} />
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/garrafas" element={<GarrafasPage />} />
        <Route path="/extrusao" element={<ExtrusaoPage />} />
        <Route path="/estoque" element={<EstoquePage />} />
        <Route path="/relatorio" element={<RelatorioPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
