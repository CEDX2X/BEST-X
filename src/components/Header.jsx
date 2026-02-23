import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navClass = ({ isActive }) =>
    isActive
      ? 'text-primary font-semibold hover:text-accent transition-colors'
      : 'text-slate-600 font-medium hover:text-primary transition-colors'

  const logoUrl =
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.googleapis.com/o/Ced%2FLOGO%20BEST%20(2).jpeg?alt=media&token=3a4b7f82-c229-4599-82cf-5b5dd7a6b2e7'

  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3">
            {/* LOGO (agrandi + responsive) */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-xl overflow-hidden bg-white border border-slate-100 flex items-center justify-center p-1.5">
              <img
                src={logoUrl}
                alt="Best Travel"
                className="w-full h-full object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-primary text-lg sm:text-xl leading-none tracking-tight">
                BEST TRAVEL
              </span>
              <span className="text-[10px] sm:text-[11px] font-bold text-accent tracking-[0.2em] uppercase">
                Votre Rêve commence ici!
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            <NavLink className={navClass} to="/procedures">Procédures</NavLink>
            <NavLink className={navClass} to="/auto-ecole">Auto-école</NavLink>
            <NavLink className={navClass} to="/langues">Cours de langue</NavLink>
            <NavLink className={navClass} to="/contact">Contact</NavLink>
            <Link
              className="bg-accent hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-md"
              to="/contact"
            >
              Protocole d'accord
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              className="p-2 text-primary focus:outline-none"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-menu"
            >
              <span className="material-symbols-outlined text-3xl">menu</span>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-menu"
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-16 left-0 w-full bg-white border-b border-slate-100 flex-col p-4 space-y-4 shadow-xl`}
      >
        <Link className="text-primary font-bold text-lg px-4 py-2 hover:bg-slate-50 rounded-lg" to="/" onClick={() => setIsMobileMenuOpen(false)}>
          Accueil
        </Link>
        <Link className="text-slate-600 font-medium text-lg px-4 py-2 hover:bg-slate-50 rounded-lg" to="/procedures" onClick={() => setIsMobileMenuOpen(false)}>
          Procédures
        </Link>
        <Link className="text-slate-600 font-medium text-lg px-4 py-2 hover:bg-slate-50 rounded-lg" to="/auto-ecole" onClick={() => setIsMobileMenuOpen(false)}>
          Auto-école
        </Link>
        <Link className="text-slate-600 font-medium text-lg px-4 py-2 hover:bg-slate-50 rounded-lg" to="/langues" onClick={() => setIsMobileMenuOpen(false)}>
          Cours de langue
        </Link>
        <Link className="bg-accent text-white px-4 py-3 rounded-xl font-bold text-center shadow-lg" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          Commencer mon Évaluation
        </Link>
      </div>
    </header>
  )
}