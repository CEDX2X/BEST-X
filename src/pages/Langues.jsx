import React from 'react'
import { Link } from 'react-router-dom'

export default function Langues() {
  return (
    <main className="bg-slate-50 dark:bg-slate-900 transition-colors">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest">
              <span className="material-symbols-outlined text-sm">translate</span>
              Préparation TEF / TCF / IELTS
            </span>

            <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-primary dark:text-white leading-tight">
              École de Langues <span className="text-accent">BestTravel</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Cours intensifs, examens blancs, correction personnalisée et stratégie pour maximiser vos points.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-accent text-white rounded-xl font-bold text-lg shadow-xl hover:bg-red-700 transition-all text-center">
                Demander une évaluation
              </Link>
              <Link to="/procedures" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-100 dark:hover:bg-slate-700 dark:text-white transition-all text-center">
                Voir les procédures
              </Link>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-700">
            <img
              alt="Test de langue"
              className="w-full h-[360px] object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FTest%20de%20langue.jpg.jpeg?alt=media&token=c5134c13-ed9b-44f5-b666-f49299191083"
            />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[{ title: 'Cours intensifs', icon: 'school', desc: 'Planning accéléré et exercices ciblés.' },
            { title: 'Examens blancs', icon: 'fact_check', desc: 'Simulation conditions réelles + feedback.' },
            { title: 'Coaching dossier', icon: 'emoji_events', desc: 'Orientation selon objectifs immigration/études.' }].map((c) => (
            <div key={c.title} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 dark:bg-primary-dark/40 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary dark:text-white text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-primary dark:text-white mb-2">{c.title}</h3>
              <p className="text-slate-600 dark:text-slate-400">{c.desc}</p>
              <div className="mt-5">
                <Link to="/contact" className="text-accent font-bold inline-flex items-center gap-2 hover:gap-3 transition-all">
                  S’inscrire <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
