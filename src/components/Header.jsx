import React, { useState, useRef } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useSiteContent } from '../context/SiteContentContext'
import { Sun, Moon, Menu, X, ArrowRight } from 'lucide-react'
import AdminLoginModal from './admin/AdminLoginModal'
import AdminDashboard from './admin/AdminDashboard'

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState(false)
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false)

  const { theme, toggleTheme } = useTheme()
  const { content } = useSiteContent()
  const lastClickRef = useRef(0)

  const lightLogoUrl =
    content.images?.lightLogo ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FIMG_5277.PNG?alt=media&token=d79056eb-f47f-4eb9-947b-eb27321b7a29'
  const darkLogoUrl =
    content.images?.darkLogo ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Flogo%20best%20blanc.png?alt=media&token=934f2a51-11ed-473f-beb4-5a6b03cefe33'

  const logoUrl = theme === 'dark' ? darkLogoUrl : lightLogoUrl
  const logoHeight = Number(content.images?.logoHeight) || 50
  const logoHeightMobile = Number(content.images?.logoHeightMobile) || Math.max(28, Math.round(logoHeight * 0.78))

  // Hidden admin trigger on double-click / double-tap
  const triggerAdminCheck = (e) => {
    if (e) e.preventDefault()
    const isAuth = sessionStorage.getItem('best_admin_authenticated') === 'true'
    if (isAuth) {
      setIsAdminDashboardOpen(true)
    } else {
      setIsAdminLoginOpen(true)
    }
  }

  const handleLogoClick = (e) => {
    const now = Date.now()
    if (now - lastClickRef.current < 450) {
      triggerAdminCheck(e)
    }
    lastClickRef.current = now
  }

  const navClass = ({ isActive }) =>
    `relative text-sm font-medium transition-colors py-1 ${
      isActive
        ? 'text-primary dark:text-blue-400 font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-primary dark:after:bg-blue-400'
        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
    }`

  return (
    <>
      {/* Hidden Admin Login Prompt */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
        onSuccess={() => {
          setIsAdminLoginOpen(false)
          setIsAdminDashboardOpen(true)
        }}
      />

      {/* Hidden Admin Full Dashboard */}
      <AdminDashboard
        isOpen={isAdminDashboardOpen}
        onClose={() => {
          try {
            sessionStorage.removeItem('best_admin_authenticated')
          } catch {}
          setIsAdminDashboardOpen(false)
        }}
      />

      <header className="bg-white/90 dark:bg-slate-925/90 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center min-h-[4.5rem] py-2">
            {/* Zone 1: Brand Logo with Double Click Admin Trigger */}
            <Link
              to="/"
              onClick={handleLogoClick}
              onDoubleClick={triggerAdminCheck}
              className="flex items-center group focus:outline-none cursor-pointer select-none py-1"
              aria-label="Best Travel Accueil (double-cliquer pour console d'administration)"
              title="Best Travel"
            >
              <div
                className="w-auto flex items-center justify-center transition-all duration-150"
                style={{
                  height: `${logoHeight}px`,
                  maxHeight: '90px',
                }}
              >
                <img
                  src={logoUrl}
                  alt={content.general?.brandName || 'Best Travel'}
                  style={{
                    height: `${logoHeight}px`,
                    maxHeight: '90px',
                  }}
                  className="w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                  loading="eager"
                />
              </div>
            </Link>

            {/* Zone 2: Clean Text Nav Links */}
            <nav className="hidden md:flex items-center gap-8">
              <NavLink className={navClass} to="/">
                Accueil
              </NavLink>
              <NavLink className={navClass} to="/procedures">
                Procédures Canada
              </NavLink>
              <NavLink className={navClass} to="/auto-ecole">
                Auto-école
              </NavLink>
              <NavLink className={navClass} to="/langues">
                Cours de langue
              </NavLink>
              <NavLink className={navClass} to="/contact">
                Contact
              </NavLink>
            </nav>

            {/* Zone 3: Primary Actions */}
            <div className="hidden md:flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white rounded-lg hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                aria-label="Basculer le thème"
                title="Basculer le thème"
              >
                {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-accent hover:bg-accent-hover rounded-xl shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 whitespace-nowrap"
              >
                <span>Évaluation gratuite</span>
                <ArrowRight className="size-4" />
              </Link>
            </div>

            {/* Mobile Actions & Hamburger */}
            <div className="md:hidden flex items-center gap-2">
              <button
                onClick={toggleTheme}
                className="p-2 text-slate-600 dark:text-slate-300"
                aria-label="Basculer le thème"
              >
                {theme === 'dark' ? <Sun className="size-5" /> : <Moon className="size-5" />}
              </button>
              <button
                className="p-2 text-slate-800 dark:text-white focus:outline-none"
                onClick={() => setIsMobileMenuOpen((v) => !v)}
                aria-expanded={isMobileMenuOpen}
                aria-label="Ouvrir le menu de navigation"
              >
                {isMobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-white/10 px-4 pt-3 pb-6 space-y-3">
            <Link
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              Accueil
            </Link>
            <Link
              to="/procedures"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              Procédures Canada
            </Link>
            <Link
              to="/auto-ecole"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              Auto-école
            </Link>
            <Link
              to="/langues"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              Cours de langue
            </Link>
            <Link
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/5 rounded-lg"
            >
              Contact
            </Link>
            <div className="pt-2">
              <Link
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block w-full py-3 text-center text-sm font-semibold text-white bg-accent rounded-xl shadow-md"
              >
                Évaluation gratuite
              </Link>
            </div>
          </div>
        )}
      </header>
    </>
  )
}
