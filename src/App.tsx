import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RobotProvider } from './context/RobotContext';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <RobotProvider>
        <div className="min-h-screen bg-gray-100">
          <Routes>
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </div>
      </RobotProvider>
    </Router>
  );
}

export default App;