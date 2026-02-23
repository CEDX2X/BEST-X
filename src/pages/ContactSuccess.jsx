import React from 'react'
import { Link } from 'react-router-dom'

export default function ContactSuccess() {
  return (
    <main className="bg-slate-50">
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto bg-white border border-slate-100 rounded-3xl p-10 text-center shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-green-50 flex items-center justify-center mx-auto mb-6">
            <span className="material-symbols-outlined text-green-600 text-4xl">check_circle</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-primary">Merci ! 🎉</h1>
          <p className="mt-4 text-slate-600 text-lg">Votre demande a bien été envoyée. Un conseiller vous contactera très vite.</p>
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/" className="px-8 py-4 bg-primary text-white rounded-xl font-bold shadow-xl hover:bg-blue-700 transition-all">Retour à l’accueil</Link>
            <Link to="/procedures" className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-bold hover:bg-slate-100 transition-all">Voir les procédures</Link>
          </div>
        </div>
      </section>
    </main>
  )
}
