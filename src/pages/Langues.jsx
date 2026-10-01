import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Languages, CheckCircle2, Award, ArrowRight, BookOpen, Clock, FileCheck } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

export default function Langues() {
  const navigate = useNavigate()
  const { content, offers } = useSiteContent()

  const languesTexts = content.texts?.langues || {}
  const languesImage =
    content.images?.languesImage ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FTest%20de%20langue.jpg.jpeg?alt=media&token=c5134c13-ed9b-44f5-b666-f49299191083'

  const dynamicLangueOffers = offers.filter(
    (o) => o.serviceCategory === 'langues' && o.active !== false
  )

  const exams = dynamicLangueOffers.length > 0
    ? dynamicLangueOffers.map((o) => ({
        id: o.id,
        name: o.title,
        target: o.badge || 'Reconnu par IRCC',
        description: o.desc,
        benchmark: o.price || 'Tarif et sessions en agence',
        format: Array.isArray(o.highlights) && o.highlights.length > 0 ? o.highlights.join(' · ') : 'Entraînement intensif',
      }))
    : [
        {
          id: 'tef-canada',
          name: 'TEF Canada (Test d’Évaluation de Français)',
          target: 'Admis par IRCC pour la résidence permanente et la citoyenneté',
          description: 'L’épreuve de référence pour valoriser votre bilinguisme. Préparation ciblée aux 4 épreuves : compréhension orale/écrite et expression orale/écrite.',
          benchmark: 'Objectif NCLC 7 minimum (B2 avancé) pour déclencher le bonus bilingue.',
          format: 'Tests sur ordinateur avec sujets d’annales officielles.',
        },
        {
          id: 'tcf-canada',
          name: 'TCF Canada (Test de Connaissance du Français)',
          target: 'Reconnu par Immigration, Réfugiés et Citoyenneté Canada',
          description: 'Format standardisé très prisé des candidats. Séances d’entraînement intensives axées sur la rapidité de réponse et la structure argumentative.',
          benchmark: 'Équivalence NCLC 7 à 9 pour maximiser votre score au barème SCG.',
          format: 'Épreuves obligatoires en compréhension et en expression.',
        },
        {
          id: 'ielts-general',
          name: 'IELTS General Training (Anglais)',
          target: 'Premier test d’anglais mondial pour l’immigration au Canada',
          description: 'Perfectionnement pour hisser votre score CLB (Canadian Language Benchmark) en première ou deuxième langue officielle.',
          benchmark: 'Band score 6.0 à 7.5 recommandé selon le profil.',
          format: 'Speaking en face-à-face, Listening, Reading et Writing.',
        },
      ]

  const pillars = [
    {
      number: '01',
      title: 'Diagnostic initial gratuit',
      desc: 'Évaluation sans frais de votre niveau actuel pour concevoir un plan de révision réaliste et personnalisé.',
    },
    {
      number: '02',
      title: 'Examens blancs chronométrés',
      desc: 'Mises en situation sous conditions strictes d’examen pour éliminer le stress et dompter la gestion du temps.',
    },
    {
      number: '03',
      title: 'Ateliers d’expression orale',
      desc: 'Simulations d’entretiens avec des formateurs certifiés pour soigner la fluidité, le vocabulaire et l’argumentation.',
    },
    {
      number: '04',
      title: 'Coaching correction individualisée',
      desc: 'Analyse détaillée de vos productions écrites avec repérage systématique des fautes récurrentes et grilles de notation IRCC.',
    },
  ]

  return (
    <main className="bg-white dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* Header */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-20 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="text-accent font-bold">Centre Préparatoire Agréé</span>
                <span aria-hidden="true">·</span>
                <span>{languesTexts.headerKicker || 'Douala, Cameroun · TEF · TCF · IELTS'}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {languesTexts.headerTitle || 'Préparation aux Tests de Langues pour le Canada'}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {languesTexts.headerDesc || "Les compétences linguistiques représentent jusqu'à 136 points dans le bassin Entrée Express et conditionnent l'obtention du permis d'études. Entraînez-vous avec des spécialistes certifiés pour sécuriser le niveau NCLC 7+."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/contact', { state: { service: 'Cours de langue' } })}
                  className="px-6 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                >
                  Réserver un test diagnostique
                </button>
                <Link
                  to="/procedures"
                  className="px-6 py-3.5 bg-slate-200/70 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 rounded-xl font-medium text-sm transition-colors"
                >
                  Voir les seuils de points
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-slate-850">
                <img
                  src={languesImage}
                  alt="Préparation linguistique TEF TCF Canada - Best Travel"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Tests Officiels Reconnus */}
      <section className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400">
              Certifications Officielles
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Les Formations & Examens Préparés ({exams.length})
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Nous sélectionnons les épreuves les plus avantageuses selon votre cursus et vos objectifs de score.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {exams.map((exam) => (
              <div
                key={exam.id}
                className="rounded-2xl p-7 border border-slate-200/80 dark:border-white/10 bg-white dark:bg-slate-850 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-accent uppercase tracking-wider">
                      {exam.target}
                    </span>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {exam.name}
                    </h3>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {exam.description}
                  </p>

                  <div className="pt-2 space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-slate-700 dark:text-slate-200 font-medium">
                      <Award className="size-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{exam.benchmark}</span>
                    </div>
                    <div className="flex items-start gap-2 text-slate-500 dark:text-slate-400">
                      <CheckCircle2 className="size-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{exam.format}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5">
                  <button
                    onClick={() => navigate('/contact', { state: { service: `Préparation ${exam.name}` } })}
                    className="w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white rounded-xl text-xs font-semibold transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Rejoindre une session</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Piliers pédagogiques */}
      <section className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400">
              Méthodologie de Réussite
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Les 4 piliers de notre enseignement
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pil) => (
              <div
                key={pil.number}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-850 space-y-3"
              >
                <div className="font-display text-2xl font-black text-slate-400/40 dark:text-slate-600">
                  {pil.number}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  {pil.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {pil.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

    </main>
  )
}
