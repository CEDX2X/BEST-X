import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'

import Home from './pages/Home'
import Procedures from './pages/Procedures'
import AutoEcole from './pages/AutoEcole'
import Langues from './pages/Langues'
import Contact from './pages/Contact'
import ContactSuccess from './pages/ContactSuccess'

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />

        <Route path="/procedures" element={<Procedures />} />
        <Route path="/auto-ecole" element={<AutoEcole />} />
        <Route path="/langues" element={<Langues />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/success" element={<ContactSuccess />} />

        {/* Redirections utiles */}
        <Route path="/procedure" element={<Navigate to="/procedures" replace />} />
        <Route path="/autoecole" element={<Navigate to="/auto-ecole" replace />} />
        <Route path="/language" element={<Navigate to="/langues" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
