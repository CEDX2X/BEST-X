import React from 'react'
import { Link } from 'react-router-dom'

export default function Procedures() {
  const canadaProcedures = [
    {
      title: "Permis d'Étude",
      desc: "Accompagnement complet : admission, dossier et obtention du visa étudiant.",
      badge: "Populaire",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Fvisa%20%C3%A9tudiant.jpg.jpeg?alt=media&token=af1ad51f-71da-42f5-8211-8730971009eb"
    },
    {
      title: "Entrée Express (Individuel)",
      desc: "Système rapide pour les travailleurs qualifiés souhaitant immigrer au Canada.",
      badge: "Rapide",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Fvisa%20%C3%A9tudiant.jpg.jpeg?alt=media&token=af1ad51f-71da-42f5-8211-8730971009eb"
    },
    {
      title: "Entrée Express (Famille)",
      desc: "Regroupement familial : conjoint, enfants ou parents.",
      badge: "Famille",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FRP%20couple.jpg.jpeg?alt=media&token=c73f0615-ddca-4135-a124-25f3cc70b41f"
    }
  ];

  const europeProcedures = [
    {
      title: "Visa Visiteur Italie",
      desc: "Opportunité saisonnière pour travailler légalement en Italie.",
      badge: "Saisonnier",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Fvisiter%20l'italie.jpg.jpeg?alt=media&token=2831c4b7-9ffd-44b7-9978-372874954f9d"
    },
    {
      title: "Visa Étudiant Europe",
      desc: "Inscription universitaire + accompagnement complet du dossier.",
      badge: "Études",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Fvisa%20%C3%A9tudiant.jpg.jpeg?alt=media&token=af1ad51f-71da-42f5-8211-8730971009eb"
    },
    {
      title: "Visa Travail Autonome",
      desc: "Programme pour travailler légalement en Europe (ex : France).",
      badge: "Travail",
      image: "https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FRP%20couple.jpg.jpeg?alt=media&token=c73f0615-ddca-4135-a124-25f3cc70b41f"
    }
  ];

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
            Best HYTravel vous accompagne pas à pas dans vos démarches d'immigration. Profitez de notre expertise locale au Cameroun.
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

          {/* Section Canada */}
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
              {canadaProcedures.map((x) => (
                <div key={x.title} className="p-5 rounded-2xl border border-slate-200 hover:border-accent transition-all hover:shadow-lg">
                  <div className="mb-4">
                    <img src={x.image} alt={x.title} className="w-full aspect-square object-cover rounded-lg" />
                  </div>
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

          {/* Section Italie/France */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6 sm:p-8 shadow-sm">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-14 h-14 rounded-2xl bg-primary text-white flex items-center justify-center">
                <span className="material-symbols-outlined text-3xl">flight_takeoff</span>
              </div>
              <div>
                <h2 className="text-2xl font-extrabold text-primary">Immigration Italie & France</h2>
                <p className="text-slate-500">Culture, histoire et diversité</p>
              </div>
            </div>

            <div className="grid gap-4">
              {europeProcedures.map((x) => (
                <div key={x.title} className="p-5 rounded-2xl border border-slate-200 hover:border-primary transition-all hover:shadow-lg">
                  <div className="mb-4">
                    <img src={x.image} alt={x.title} className="w-full aspect-square object-cover rounded-lg" />
                  </div>
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
