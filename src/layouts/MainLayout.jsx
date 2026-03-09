import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="overflow-x-hidden font-display text-slate-800 bg-white antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      {location.pathname !== '/' && (
        <button
          onClick={handleBack}
          className="fixed bottom-6 right-6 bg-primary hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-all z-50"
          aria-label="Retour à la page précédente"
        >
          <span className="material-symbols-outlined text-2xl">arrow_back</span>
        </button>
      )}
    </div>
  )
}
