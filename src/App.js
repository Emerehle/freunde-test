import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Way from './Way';
import Login from './Login';
import Freunde from './Freunde';
import Games from './Games';
import './App.css'
import Register from './Register';

export default function App() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/way' element={<Way />} />
            <Route path='/freunde' element={<Freunde />} />
            <Route path='/games' element={<Games />} />
            <Route path='/registriere' element={<Register />} />
        </Routes>
    </BrowserRouter>
  );
}
