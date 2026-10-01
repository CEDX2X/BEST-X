import React, { useState } from 'react'
import { Lock, KeyRound, X, AlertTriangle, ArrowRight } from 'lucide-react'
import { useSiteContent } from '../../context/SiteContentContext'

export default function AdminLoginModal({ isOpen, onClose, onSuccess }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const { adminPassword } = useSiteContent()

  if (!isOpen) return null

  const handleSubmit = (e) => {
    e.preventDefault()
    const expected = adminPassword || 'Henribest123'
    if (password === expected) {
      setError(false)
      setPassword('')
      sessionStorage.setItem('best_admin_authenticated', 'true')
      onSuccess()
    } else {
      setError(true)
    }
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div className="relative w-full max-w-sm bg-[#0B132B] border border-slate-700/80 rounded-2xl shadow-2xl p-6 text-slate-100 space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
          aria-label="Fermer"
        >
          <X className="size-5" />
        </button>

        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-xl bg-accent/15 border border-accent/30 text-accent flex items-center justify-center shadow-inner">
            <Lock className="size-6" />
          </div>
          <h3 className="font-display text-xl font-bold text-white tracking-tight">
            Administration Best Travel
          </h3>
          <p className="text-xs text-slate-400">
            Portail de gestion éditoriale et commerciale
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300">
              Mot de passe administrateur
            </label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  if (error) setError(false)
                }}
                placeholder="••••••••••••"
                autoFocus
                className="w-full px-4 py-3 pl-10 bg-slate-900 border border-slate-700 rounded-xl text-white placeholder-slate-500 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent transition-all"
              />
              <KeyRound className="absolute left-3.5 top-3.5 size-4 text-slate-500" />
            </div>
            {error && (
              <div className="flex items-center gap-1.5 text-xs text-rose-400 pt-1">
                <AlertTriangle className="size-3.5 shrink-0" />
                <span>Mot de passe incorrect. Veuillez réessayer.</span>
              </div>
            )}
          </div>

          <div className="pt-1">
            <button
              type="submit"
              className="w-full py-3 px-4 bg-accent hover:bg-accent-hover active:scale-[0.98] text-white rounded-xl font-semibold text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <span>Accéder au tableau de bord</span>
              <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
