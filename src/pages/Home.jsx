import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Home() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // kept in case you later reuse
  const navigate = useNavigate()

  return (
    <main>
      <section className="relative h-[600px] sm:h-[700px] w-full flex items-center overflow-hidden">
        <img
          alt="Affiche de best travel presente qui nous sommes"
          className="absolute inset-0 w-full h-full object-cover"
          src="https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FBEST1.jpeg?alt=media&token=2d7b4f19-468d-46a0-adf6-e717d224c413"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center px-4 py-1.5 bg-accent/20 border border-accent/30 text-accent rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-sm">
              <span className="w-2 h-2 bg-accent rounded-full mr-2 animate-pulse"></span>
              Basé au Cameroun (Douala & Yaoundé)
            </div>
            <h1 className="text-4xl sm:text-6xl font-extrabold text-white leading-[1.1]">
              Votre rêve canadien commence au <span className="text-accent">Cameroun</span>.
            </h1>
            <p className="text-white/80 text-lg sm:text-xl leading-relaxed">
              Un accompagnement certifié et de proximité pour votre projet d'immigration, d'études ou de travail au Canada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-6">
              <button
                onClick={() => navigate('/contact')}
                className="px-8 py-4 bg-accent hover:bg-red-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:-translate-y-1"
              >
                Évaluation gratuite
              </button>
              <button
                onClick={() => navigate('/procedures')}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/30 backdrop-blur-md rounded-xl font-bold text-lg transition-all"
              >
                Nos Services
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 px-6 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-primary mb-4">Nos Services d'Expertise</h2>
            <p className="text-slate-500 text-lg">Nous vous accompagnons à chaque étape de votre projet avec des solutions adaptées à votre profil.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-16 h-16 bg-primary/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary transition-colors">
                <span className="material-symbols-outlined text-primary group-hover:text-white text-4xl transition-colors">flight_takeoff</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Immigration & Visas</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Entrée express, regroupement familial, permis d'études et de travail. Analyse complète de votre admissibilité.</p>
              <Link className="inline-flex items-center text-accent font-bold group-hover:gap-2 transition-all" to="/procedures">
                En savoir plus <span className="material-icons text-sm ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-16 h-16 bg-accent/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-accent transition-colors">
                <span className="material-symbols-outlined text-accent group-hover:text-white text-4xl transition-colors">directions_car</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Préparation Permis</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Formation conduite intensive au Cameroun adaptée aux normes de sécurité routière canadiennes.</p>
              <Link className="inline-flex items-center text-accent font-bold group-hover:gap-2 transition-all" to="/auto-ecole">
                En savoir plus <span className="material-icons text-sm ml-1">arrow_forward</span>
              </Link>
            </div>

            <div className="group bg-white p-8 rounded-2xl shadow-sm border border-slate-100 hover:shadow-xl hover:border-accent/20 transition-all duration-300">
              <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-blue-600 transition-colors">
                <span className="material-symbols-outlined text-blue-600 group-hover:text-white text-4xl transition-colors">translate</span>
              </div>
              <h3 className="text-xl font-bold text-primary mb-3">Tests de Langue</h3>
              <p className="text-slate-500 leading-relaxed mb-6">Cours intensifs pour TEF, TCF et IELTS. Maximisez vos points pour le bassin de sélection.</p>
              <Link className="inline-flex items-center text-accent font-bold group-hover:gap-2 transition-all" to="/langues">
                En savoir plus <span className="material-icons text-sm ml-1">arrow_forward</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-primary">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">98%</div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Taux de Succès</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">10+</div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Années d'Expérience</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">2.5k</div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Familles Installées</div>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1">24/7</div>
            <div className="text-white/60 text-sm font-medium uppercase tracking-widest">Support Expert</div>
          </div>
        </div>
      </section>
    </main>
  )
}
