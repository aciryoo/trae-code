import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import ImageGeneration from './pages/ImageGeneration';
import VideoGeneration from './pages/VideoGeneration';
import Settings from './pages/Settings';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-green-50">
        <Navigation />
        <Routes>
          <Route path="/" element={<ImageGeneration />} />
          <Route path="/video" element={<VideoGeneration />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </div>
    </Router>
  );
}
