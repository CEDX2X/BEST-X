import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactSuccess() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900 transition-colors">
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 rounded-3xl p-10 text-center shadow-sm transition-colors">
          <div className="w-16 h-16 rounded-2xl bg-green-50 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 dark:text-green-400 text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-white">Merci ! 🎉</h1>
          <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">Votre demande a bien été envoyée. Un conseiller vous contactera très vite.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="px-8 py-4 bg-primary dark:bg-primary-dark text-white rounded-xl font-bold shadow-xl hover:bg-primary/90 transition-all">Retour à l’accueil</Link>
            <Link to="/procedures" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 dark:text-white rounded-xl font-bold hover:bg-slate-100 dark:hover:bg-slate-700 transition-all">Voir les procédures</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
