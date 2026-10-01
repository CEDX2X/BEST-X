import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function MainLayout() {
  const location = useLocation()
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="overflow-x-hidden font-sans text-slate-800 dark:text-slate-100 bg-white dark:bg-slate-925 transition-colors antialiased min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
      {location.pathname !== '/' && (
        <button
          onClick={handleBack}
          className="fixed left-6 bottom-6 bg-slate-900/90 dark:bg-slate-800/95 hover:bg-slate-900 dark:hover:bg-slate-700 text-white pl-3.5 pr-4 py-2.5 rounded-full shadow-xl backdrop-blur-md transition-all z-40 hover:scale-105 active:scale-95 flex items-center gap-2 text-xs font-semibold border border-white/10"
          aria-label="Retour à la page précédente"
        >
          <ArrowLeft className="size-4" />
          <span>Retour</span>
        </button>
      )}
    </div>
  )
}
