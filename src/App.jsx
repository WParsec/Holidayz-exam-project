import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Components
import Layout from './layout';
import Home from './pages/home';

// Pages
import Venue from './pages/venue';
import Auth from './pages/auth';

import './App.scss';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/venue/:id" element={<Venue />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
