import React from 'react'
import { Link } from 'react-router-dom'

export default function Procedures() {
  return (
    <main className="bg-slate-50">
      <section className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <span className="inline-block py-1 px-3 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider mb-4">
            Experts en Immigration
          </span>
          <h1 className="text-4xl sm:text-6xl font-extrabold text-primary mb-6">
            Immigration <span className="text-accent">Canada</span> & <span className="text-primary">Italie</span>
          </h1>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">
            BestTravel vous accompagne pas à pas dans vos démarches d'immigration. Profitez de notre expertise locale au Cameroun.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <Link className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold text-lg shadow-xl transition-all" to="/contact">
              Prendre rendez-vous
            </Link>
            <a className="bg-white hover:bg-slate-100 text-slate-900 border border-slate-200 px-8 py-4 rounded-xl font-bold text-lg transition-all" href="tel:+237600000000">
              Nous appeler
            </a>
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-accent text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">public</span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-primary">Immigration Canada</h2>
                <p className="text-slate-500">Terre d'opportunités et d'accueil</p>
              </div>
            </div>

            <div className="grid gap-4">
              {[{ title: 'Entrée Express individuel', desc: "Système de sélection rapide pour les travailleurs qualifiés.", badge: 'Populaire' },
                { title: "Permis d'Études", desc: "Accompagnement complet de l'admission au visa étudiant." },
                { title: 'Entrée Express Groupe', desc: 'Parrainage conjoint, enfants ou parents.' }].map((x) => (
                <div key={x.title} className="p-5 rounded-2xl border border-slate-200 hover:border-accent transition-all hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{x.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{x.desc}</p>
                    </div>
                    {x.badge && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded uppercase bg-accent/10 text-accent">{x.badge}</span>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link className="text-accent font-bold inline-flex items-center gap-2 hover:gap-3 transition-all" to="/contact">
                      En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-primary">Immigration Italie</h2>
                <p className="text-slate-500">Culture, histoire et opportunités</p>
              </div>
            </div>

            <div className="grid gap-4">
              {[{ title: 'Decreto Flussi', desc: "Programme annuel d’accès au marché du travail italien.", badge: 'Saisonnier' },
                { title: 'Visa Étudiant', desc: "Inscription université + accompagnement dossier." },
                { title: 'Visa Travail Autonome', desc: 'Pour entrepreneurs et freelances.' }].map((x) => (
                <div key={x.title} className="p-5 rounded-2xl border border-slate-200 hover:border-primary transition-all hover:shadow-lg">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-bold text-lg">{x.title}</h3>
                      <p className="text-slate-600 text-sm mt-1">{x.desc}</p>
                    </div>
                    {x.badge && (
                      <span className="text-[10px] font-bold px-2 py-1 rounded uppercase bg-primary/10 text-primary">{x.badge}</span>
                    )}
                  </div>
                  <div className="mt-4">
                    <Link className="text-primary font-bold inline-flex items-center gap-2 hover:gap-3 transition-all" to="/contact">
                      En savoir plus <span className="material-symbols-outlined text-sm">arrow_forward</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
