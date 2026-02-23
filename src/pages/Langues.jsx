import React from 'react'
import { Link } from 'react-router-dom'

export default function Langues() {
  return (
    <main className="bg-slate-50">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent/10 text-accent rounded-full text-xs font-bold uppercase tracking-widest">
            <span className="material-symbols-outlined text-sm">translate</span>
            Préparation TEF / TCF / IELTS
          </span>

          <h1 className="mt-6 text-4xl sm:text-6xl font-extrabold text-primary">École de Langues <span className="text-accent">BestTravel</span></h1>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            Cours intensifs, examens blancs, correction personnalisée et stratégie pour maximiser vos points.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/contact" className="px-8 py-4 bg-accent text-white rounded-xl font-bold text-lg shadow-xl hover:bg-red-700 transition-all">
              Demander une évaluation
            </Link>
            <Link to="/procedures" className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-100 transition-all">
              Voir les procédures
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-3 gap-6">
          {[{ title: 'Cours intensifs', icon: 'school', desc: 'Planning accéléré et exercices ciblés.' },
            { title: 'Examens blancs', icon: 'fact_check', desc: 'Simulation conditions réelles + feedback.' },
            { title: 'Coaching dossier', icon: 'emoji_events', desc: 'Orientation selon objectifs immigration/études.' }].map((c) => (
            <div key={c.title} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg transition-all">
              <div className="w-16 h-16 rounded-2xl bg-primary/5 flex items-center justify-center mb-6">
                <span className="material-symbols-outlined text-primary text-3xl">{c.icon}</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{c.title}</h3>
              <p className="text-slate-600">{c.desc}</p>
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
