import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Car, CheckCircle2, ShieldCheck, Clock, Award, ArrowRight, BookOpen, AlertCircle } from 'lucide-react'
import { useSiteContent } from '../context/SiteContentContext'

export default function AutoEcole() {
  const navigate = useNavigate()
  const { content, offers } = useSiteContent()

  const autoTexts = content.texts?.autoEcole || {}
  const autoImage =
    content.images?.autoEcoleImage ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FAuto%20ecole_Plan%20de%20travail%201%20copie.jpg.jpeg?alt=media&token=892587db-b98d-4b57-bfd8-1fe63f50f87b'

  // Dynamic offers for auto-école that are active
  const dynamicAutoOffers = offers.filter(
    (o) => o.serviceCategory === 'auto-ecole' && o.active !== false
  )

  const packages = dynamicAutoOffers.length > 0
    ? dynamicAutoOffers.map((o) => ({
        id: o.id,
        name: o.title,
        price: o.price || 'Tarif agence',
        duration: o.timeline || '4 à 6 semaines',
        description: o.desc,
        features: Array.isArray(o.highlights) && o.highlights.length > 0
          ? o.highlights
          : ['Formation théorique multimédia', 'Conduite pratique double-commande', 'Accompagnement examen'],
        popular: o.badge?.toLowerCase().includes('complet') || false,
      }))
    : [
        {
          id: 'permis-b-standard',
          name: 'Formation Permis B (Véhicule Léger)',
          price: '150 000 FCFA',
          duration: '5 à 6 semaines',
          description: 'Programme complet d’apprentissage de la conduite pour conducteurs débutants avec passage de l’examen officiel.',
          features: [
            'Cours théoriques illimités en salle climatisée',
            '20 heures de cours pratiques sur véhicule récent',
            'Frais d’inscription et dossier préfectoral inclus',
            'Examen blanc de code et de conduite avant épreuve officielle',
          ],
          popular: false,
        },
        {
          id: 'forfait-express-vip',
          name: 'Forfait Accéléré VIP / Départ Imminent',
          price: '225 000 FCFA',
          duration: '3 semaines intensives',
          description: 'Rythme quotidien intensif avec moniteur dédié pour les candidats ayant un impératif de départ rapide vers le Canada ou l’étranger.',
          features: [
            'Planning prioritaire et horaires flexibles sur-mesure',
            '30 heures de conduite intensive et perfectionnement autoroute',
            'Module spécial : Réflexes et signalisation nord-américaine',
            'Présentation garantie à la plus proche session d’examen',
          ],
          popular: true,
        },
      ]

  const modules = [
    {
      title: '01. Code de la Route & Signalisation',
      desc: 'Maîtrise complète des priorités, panneaux d’interdiction, de danger et de guidage. Séances de tests chronométrés sur boîtiers électroniques.',
    },
    {
      title: '02. Pratique & Conduite Défensive',
      desc: 'Apprentissage des trajectoires, créneaux, démarrages en côte et anticipation des comportements à risque des autres usagers.',
    },
    {
      title: '03. Mécanique de Base & Entretien',
      desc: 'Vérification des niveaux, changement de roue, identification des voyants de bord et réflexes d’urgence en cas d’avarie.',
    },
    {
      title: '04. Préparation Spécifique Mobilité',
      desc: 'Sensibilisation aux normes de conduite internationales (priorités à droite inversées, autoroutes à voies multiples, conduite en conditions climatiques variées).',
    },
  ]

  return (
    <main className="bg-white dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* Header & Hero */}
      <section className="pt-12 pb-16 sm:pt-16 sm:pb-24 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="text-accent font-bold">Auto-École Agréée</span>
                <span aria-hidden="true">·</span>
                <span>{autoTexts.headerKicker || 'Formation Conducteur & Mobilité'}</span>
              </div>

              <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {autoTexts.headerTitle || 'Formation Conduite & Permis Sécurisé'}
              </h1>

              <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                {autoTexts.headerDesc || "Apprenez à conduire en toute sécurité avec des moniteurs chevronnés. Notre formation intègre les réflexes de conduite défensive indispensables pour réussir vos futurs examens de conduite au Cameroun comme à l'étranger."}
              </p>

              <div className="pt-2 flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/contact', { state: { service: 'Auto-école' } })}
                  className="px-6 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-sm shadow-sm transition-all"
                >
                  S'inscrire à une session
                </button>
                <a
                  href="#tarifs"
                  className="px-6 py-3.5 bg-slate-200/70 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 rounded-xl font-medium text-sm transition-colors"
                >
                  Consulter les forfaits ({packages.length})
                </a>
              </div>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-lg bg-slate-100 dark:bg-slate-850">
                <img
                  src={autoImage}
                  alt="Auto-École Best Travel - Formation pratique conduite"
                  className="w-full h-80 object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Modules de Formation */}
      <section className="py-14 sm:py-20 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400">
              Pédagogie & Méthode
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Un programme axé sur la sécurité et la maîtrise
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed">
              Nous formons des conducteurs responsables, capables d'anticiper les dangers et de maîtriser
              leur véhicule en toute circonstance.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {modules.map((m, i) => (
              <div
                key={i}
                className="p-6 rounded-2xl border border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-850 space-y-3"
              >
                <div className="text-xs font-bold text-accent tracking-wider uppercase">
                  Étape {i + 1}
                </div>
                <h3 className="font-display font-bold text-base text-slate-900 dark:text-white">
                  {m.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                  {m.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Tarifs et Forfaits */}
      <section id="tarifs" className="py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400">
              Tarification Transparente
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Nos Forfaits de Formation
            </h2>
            <p className="mt-3 text-slate-600 dark:text-slate-300 text-sm sm:text-base">
              Des formules adaptées à votre emploi du temps et à vos objectifs professionnels ou de voyage.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {packages.map((pkg) => (
              <div
                key={pkg.id}
                className={`rounded-2xl p-7 border flex flex-col justify-between transition-all ${
                  pkg.popular
                    ? 'border-accent bg-white dark:bg-slate-850 shadow-xl relative'
                    : 'border-slate-200/80 dark:border-white/10 bg-slate-50/60 dark:bg-slate-900'
                }`}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-accent text-white text-[11px] font-bold rounded-full uppercase tracking-wider">
                    Formule la plus demandée
                  </div>
                )}

                <div className="space-y-4">
                  <div>
                    <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">
                      {pkg.name}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                      Durée moyenne : {pkg.duration}
                    </p>
                  </div>

                  <div className="pt-2 pb-1 border-y border-slate-200/60 dark:border-white/5">
                    <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                      {pkg.price}
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {pkg.description}
                  </p>

                  <ul className="space-y-2 pt-2 text-xs text-slate-600 dark:text-slate-300">
                    {pkg.features.map((feat, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="size-3.5 text-accent shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-200/60 dark:border-white/5">
                  <button
                    onClick={() => navigate('/contact', { state: { service: `Auto-École : ${pkg.name}` } })}
                    className={`w-full py-3 px-4 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2 ${
                      pkg.popular
                        ? 'bg-accent hover:bg-accent-hover text-white shadow-md'
                        : 'bg-slate-900 hover:bg-slate-800 dark:bg-white/10 dark:hover:bg-white/20 text-white'
                    }`}
                  >
                    <span>Choisir ce forfait</span>
                    <ArrowRight className="size-3.5" />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

    </main>
  )
}
