import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()

  const navClass = ({ isActive }) =>
    isActive
      ? 'text-primary dark:text-white font-semibold hover:text-accent transition-colors'
      : 'text-slate-600 dark:text-slate-300 font-medium hover:text-primary dark:hover:text-white transition-colors'

  const mobileNavClass = ({ isActive }) =>
    isActive
      ? 'text-primary dark:text-white font-bold text-lg px-4 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg'
      : 'text-slate-600 dark:text-slate-300 font-medium text-lg px-4 py-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg'

  const lightLogoUrl = 'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FIMG_5277.PNG?alt=media&token=d79056eb-f47f-4eb9-947b-eb27321b7a29'
  const darkLogoUrl = 'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Flogo%20best%20blanc.png?alt=media&token=934f2a51-11ed-473f-beb4-5a6b03cefe33'
  
  const logoUrl = theme === 'dark' ? darkLogoUrl : lightLogoUrl

  return (
    <header className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">
          <Link to="/" className="flex items-center space-x-3">
            {/* LOGO (agrandi + responsive) */}
            <div className="h-12 sm:h-14 md:h-16 w-auto flex items-center justify-center">
              <img
                src={logoUrl}
                alt="Best Travel"
                className="h-full w-auto object-contain"
                loading="lazy"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-primary dark:text-white text-lg sm:text-xl leading-none tracking-tight">
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
            <button onClick={toggleTheme} className="p-2 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-white transition-colors" aria-label="Toggle Dark Mode">
              <span className="material-symbols-outlined text-2xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <Link
              className="bg-accent hover:bg-red-700 text-white px-6 py-2.5 rounded-full font-bold transition-all transform hover:scale-105 shadow-md"
              to="/contact"
            >
              Protocole d'accord
            </Link>
          </nav>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={toggleTheme} className="p-2 text-slate-500 dark:text-slate-400" aria-label="Toggle Dark Mode">
              <span className="material-symbols-outlined text-2xl">{theme === 'dark' ? 'light_mode' : 'dark_mode'}</span>
            </button>
            <button
              className="p-2 text-primary dark:text-white focus:outline-none"
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
        className={`${isMobileMenuOpen ? 'flex' : 'hidden'} md:hidden absolute top-16 left-0 w-full bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex-col p-4 space-y-4 shadow-xl`}
      >
        <NavLink className={mobileNavClass} to="/" onClick={() => setIsMobileMenuOpen(false)}>
          Accueil
        </NavLink>
        <NavLink className={mobileNavClass} to="/procedures" onClick={() => setIsMobileMenuOpen(false)}>
          Procédures
        </NavLink>
        <NavLink className={mobileNavClass} to="/auto-ecole" onClick={() => setIsMobileMenuOpen(false)}>
          Auto-école
        </NavLink>
        <NavLink className={mobileNavClass} to="/langues" onClick={() => setIsMobileMenuOpen(false)}>
          Cours de langue
        </NavLink>
        <Link className="bg-accent text-white px-4 py-3 rounded-xl font-bold text-center shadow-lg" to="/contact" onClick={() => setIsMobileMenuOpen(false)}>
          Commencer mon Évaluation
        </Link>
      </div>
    </header>
  )
}