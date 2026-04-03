import React from 'react'
import { Link } from 'react-router-dom'

export default function AutoEcole() {
  return (
    <main className="bg-white dark:bg-slate-900 transition-colors">
      <section className="py-16 sm:py-20 bg-slate-50 dark:bg-slate-900 transition-colors">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <span className="inline-block py-1 px-3 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
              Formation à Douala & Yaoundé
            </span>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-primary dark:text-white leading-tight">
              Auto-école <span className="text-accent">BestTravelservices</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-400 text-lg">
              Formation théorique et pratique pour obtenir votre permis rapidement avec des moniteurs certifiés.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <Link to="/contact" state={{ service: 'auto-ecole' }} className="px-8 py-4 bg-primary dark:bg-primary-dark text-white rounded-xl font-bold text-lg shadow-xl hover:-translate-y-0.5 transition-all">
                S’inscrire
              </Link>
              <a href="#tarifs" className="px-8 py-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-lg hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-white transition-all">
                Voir les tarifs
              </a>
            </div>
          </div>

          <div className="rounded-2xl overflow-hidden shadow-2xl dark:shadow-none border border-slate-100 dark:border-slate-700">
            <img
              alt="Cours de conduite"
              className="w-full h-[360px] object-cover"
              src="https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FAuto%20ecole_Plan%20de%20travail%201%20copie.jpg.jpeg?alt=media&token=892587db-b98d-4b57-bfd8-1fe63f50f87b"
            />
          </div>
        </div>
      </section>

      <section id="tarifs" className="py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-primary dark:text-white text-center mb-10">Tarifs & Forfaits</h2>

          <div className="grid lg:grid-cols-3 gap-6">
            {[
              { title: 'Permis B (Léger)', price: '150.000 FCFA', cta: 'Choisir ce forfait' },
              { title: 'Forfait VIP / Express', price: '225.000 FCFA', cta: 'M’inscrire maintenant', featured: true },
              { title: 'Permis C / D / E', price: '275.000 FCFA', cta: 'Demander infos' },
            ].map((p) => (
              <div key={p.title} className={`rounded-3xl p-8 border shadow-sm flex flex-col transition-colors ${p.featured ? 'border-accent shadow-xl bg-white dark:bg-slate-800' : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'}`}>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">{p.title}</h3>
                <div className={`text-4xl font-extrabold ${p.featured ? 'text-accent' : 'text-primary dark:text-white'} mb-6`}>{p.price}</div>

                <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-400 mb-8 flex-1">
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check</span> Cours de code + pratique</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check</span> Suivi & préparation examen</li>
                  <li className="flex gap-2"><span className="material-symbols-outlined text-green-600 dark:text-green-400 text-base">check</span> Dossier inclus</li>
                </ul>

                <Link
                  to="/contact"
                  state={{ service: 'auto-ecole' }}
                  className={`w-full py-3 text-center rounded-xl font-bold transition-all ${p.featured ? 'bg-accent text-white hover:bg-red-700' : 'border-2 border-primary dark:border-primary-dark text-primary dark:text-white hover:bg-primary dark:hover:bg-primary-dark hover:text-white'}`}
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
