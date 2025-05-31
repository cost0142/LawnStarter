// src/App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import SearchPage from './Pages/SearchPage';
import PersonDetailPage from './Pages/PersonDetailPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SearchPage />} />
      <Route path="/person/:id" element={<PersonDetailPage />} />
    </Routes>
  );
}

export default App;
