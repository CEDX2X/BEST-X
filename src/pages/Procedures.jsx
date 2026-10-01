import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Clock, FileText, Globe2, GraduationCap, Briefcase, Users, Compass } from 'lucide-react'
import SiteBackgroundMap from '../components/SiteBackgroundMap'
import { useSiteContent } from '../context/SiteContentContext'

export default function Procedures() {
  const navigate = useNavigate()
  const { content, offers } = useSiteContent()
  const [destinationFilter, setDestinationFilter] = useState('all')

  const procTexts = content.texts?.procedures || {}

  // Filter dynamic offers for immigration (canada & europe) that are active
  const dynamicProcedures = offers
    .filter((o) => (o.serviceCategory === 'canada' || o.serviceCategory === 'europe') && o.active !== false)
    .map((o) => ({
      id: o.id,
      destination: o.serviceCategory,
      destinationName: o.serviceCategory === 'canada' ? 'Canada' : 'Europe & Autres',
      title: o.title,
      desc: o.desc,
      requirements: Array.isArray(o.highlights) && o.highlights.length > 0
        ? o.highlights
        : ['Constitution rigoureuse du dossier consulaire', 'Vérification de solvabilité', 'Accompagnement biométrique'],
      timeline: o.timeline || '3 à 6 mois',
      tag: o.badge || 'Programme Officiel',
      image: o.image || content.images?.heroImage,
    }))

  const filtered = destinationFilter === 'all'
    ? dynamicProcedures
    : dynamicProcedures.filter((p) => p.destination === destinationFilter)

  return (
    <main className="bg-white dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* Header Editorial */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
        {/* Magic UI Dotted Map Ambient Pattern */}
        <SiteBackgroundMap opacity="opacity-25 dark:opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            <span>Catalogue Officiel</span>
            <span aria-hidden="true">·</span>
            <span>{procTexts.headerKicker || 'Mise à jour Règles IRCC 2026'}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {procTexts.headerTitle || "Programmes & Procédures d'Immigration"}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {procTexts.headerDesc || "Chaque filière est instruite avec une rigueur documentaire absolue. Découvrez les critères requis, les délais moyens et les pièces maîtresses de votre dossier."}
          </p>

          {/* Interactive Filters (Clean Segmented Buttons) */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-200/70 dark:bg-slate-800 rounded-xl">
            <button
              onClick={() => setDestinationFilter('all')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                destinationFilter === 'all'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Toutes les offres ({dynamicProcedures.length})
            </button>
            <button
              onClick={() => setDestinationFilter('canada')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                destinationFilter === 'canada'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Canada ({dynamicProcedures.filter((p) => p.destination === 'canada').length})
            </button>
            <button
              onClick={() => setDestinationFilter('europe')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
                destinationFilter === 'europe'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Europe & Autres ({dynamicProcedures.filter((p) => p.destination === 'europe').length})
            </button>
          </div>
        </div>
      </section>

      {/* Grid of Dossiers */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((proc) => (
              <div
                key={proc.id}
                className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-white/10 flex flex-col justify-between overflow-hidden shadow-sm hover:shadow-md hover:border-slate-300 dark:hover:border-white/20 transition-all group"
              >
                {/* Media frame */}
                <div className="relative h-48 w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={proc.image}
                    alt={proc.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded text-white border border-white/10">
                      {proc.tag}
                    </span>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-accent/90 text-white">
                      {proc.destinationName}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                  <div className="space-y-3">
                    <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white leading-snug">
                      {proc.title}
                    </h2>
                    <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                      {proc.desc}
                    </p>

                    {/* Highlights */}
                    <div className="pt-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-2">
                        Points clés du programme :
                      </div>
                      <ul className="space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
                        {proc.requirements.map((req, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <CheckCircle2 className="size-3.5 text-emerald-500 shrink-0 mt-0.5" />
                            <span>{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Footer Card */}
                  <div className="pt-4 border-t border-slate-100 dark:border-white/5 space-y-3">
                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                      <span className="flex items-center gap-1.5">
                        <Clock className="size-3.5 text-accent" />
                        <span>Délai estimé : {proc.timeline}</span>
                      </span>
                    </div>

                    <button
                      onClick={() => navigate('/contact', { state: { service: proc.title } })}
                      className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      <span>Vérifier mon admissibilité</span>
                      <ArrowRight className="size-3.5" />
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </main>
  )
}
