import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Navbar from './pages/navbar';
import Home from './pages/home';
import PagBMI from './pages/bmi';
import PagCalorie from './pages/conta_calorie';
import './App.css';

function App() {
  return (
    <Router>
      <div class="min-h-screen bg-slate-50 font-sans text-slate-900">
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />

          <Route path="/calcolatorebmi" element={<PagBMI />} />
          <Route path="/contacalorie" element={<PagCalorie />} />

          <Route path="*" element={<h1>Error 404</h1>} />
        </Routes>

      </div>

    </Router>
  )
}

export default App
