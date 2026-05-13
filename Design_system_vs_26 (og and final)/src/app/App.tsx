import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { DashboardLayout } from './components/DashboardLayout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/overview/welcome" replace />} />
        <Route path="/:tab/:subTab" element={<DashboardLayout />} />
        <Route path="*" element={<Navigate to="/overview/welcome" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
