import React from 'react'
import { Link } from 'react-router-dom'

export default function AutoEcole() {
  return (
    <main className="bg-white">
      <section className="py-16 sm:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Formation à Douala & Yaoundé
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-primary leading-tight">
              Auto-école <span className="text-accent">BestTravel</span>
            </h1>
            <p className="mt-4 text-slate-600 text-lg">
              Formation théorique et pratique pour obtenir votre permis rapidement avec des moniteurs certifiés.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" className="px-8 py-4 bg-primary text-white rounded-xl font-bold text-lg shadow-xl hover:-translate-y-0.5 transition-all">
                S’inscrire
              </Link>
              <a href="#tarifs" className="px-8 py-4 bg-white border border-slate-200 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all">
                Voir les tarifs
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-100">
            <img
              alt="Cours de conduite"
              className="w-full h-[360px] object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAkRkS_d7i4QGmYbiNpINlnsVqbgDoDtRtZalbqO_jy4slnrfUb8AZZjoniN1jvXMJ3lwBpti4G4ISkdvNiJK-fnQOYyaIeepI9cHytstjFladmcpUgCWsqN5pC2CVo6144NIaf_iLlzNB1bqUsCYUF1bS1yZP96-p1N5BMFo1FKrLWEjgmodkqGrnnFOJ2xN_mEt5OSajabXDvcoqIjs4s10jJT6qSmlH6OFNtnnPU-Ti9hM55aBngatGuHcdzW4LZ_gznDOXRjo4"
            />
          </div>
        </div>
      </section>

      <section id="tarifs" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary text-center mb-10">Tarifs & Forfaits</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { title: 'Permis B (Léger)', price: '150.000 FCFA', cta: 'Choisir ce forfait' },
              { title: 'Forfait VIP / Express', price: '225.000 FCFA', cta: 'M’inscrire maintenant', featured: true },
              { title: 'Permis C / D / E', price: '275.000 FCFA', cta: 'Demander infos' },
            ].map((p) => (
              <div key={p.title} className={`rounded-3xl p-8 border shadow-sm flex flex-col ${p.featured ? 'border-accent shadow-xl' : 'border-slate-200'}`}>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{p.title}</h3>
                <div className={`text-4xl font-extrabold ${p.featured ? 'text-accent' : 'text-primary'} mb-6`}>{p.price}</div>

                <ul className="space-y-3 text-sm text-slate-600 mb-8 flex-1">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 text-base">check</span> Cours de code + pratique</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 text-base">check</span> Suivi & préparation examen</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 text-base">check</span> Dossier inclus</li>
                </ul>

                <Link
                  to="/contact"
                  className={`w-full py-3 text-center rounded-xl font-bold transition-all ${p.featured ? 'bg-accent text-white hover:bg-red-700' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
