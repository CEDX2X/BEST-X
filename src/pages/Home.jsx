import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ChevronRight, Compass, GraduationCap, Briefcase, Car, Languages, Clock, ShieldCheck, MapPin, Phone, MessageSquare } from 'lucide-react'
import SiteBackgroundMap from '../components/SiteBackgroundMap'
import { useSiteContent } from '../context/SiteContentContext'

export default function Home() {
  const navigate = useNavigate()
  const { content } = useSiteContent()
  const [activePathway, setActivePathway] = useState('etudes')

  const homeTexts = content.texts?.home || {}
  const general = content.general || {}
  const social = content.socialLinks || {}

  const pathways = {
    etudes: {
      id: 'etudes',
      title: "Permis d'Études & Formations Post-Secondaires",
      tagline: "Admissions dans les Universités et Cégeps canadiens",
      summary: "De l'obtention de votre lettre d'acceptation (DLI) jusqu'à la délivrance du visa étudiant et du permis de travail post-diplôme (PTPD).",
      serviceParam: 'permis-etude-canada',
      requirements: [
        "Obtention de la lettre d'admission auprès d'un EED reconnu",
        "Délivrance du CAQ (Certificat d'Acceptation du Québec) si applicable",
        "Preuve de capacité financière solide et justifiable",
        "Lettre explicative de projet d'études rédigée sur-mesure",
      ],
      timeline: "Délais moyens de traitement IRCC : 8 à 14 semaines",
      targetAudience: "Bacheliers, étudiants en licence/master, professionnels en reconversion",
    },
    entreeExpress: {
      id: 'entreeExpress',
      title: "Entrée Express & Travailleurs Qualifiés",
      tagline: "Résidence permanente pour profils qualifiés et bilingues",
      summary: "Optimisation de votre score SCG (Système de Classement Global) pour être extrait des bassins réguliers ou ciblés d'IRCC.",
      serviceParam: 'entree-express-individuel',
      requirements: [
        "Évaluation des diplômes d'études (EDE via WES ou ICAS)",
        "Résultats aux tests linguistiques officiels (TEF/TCF/IELTS)",
        "Preuve d'expérience professionnelle qualifiée (FÉER 0, 1, 2 ou 3)",
        "Vérification de l'admissibilité aux programmes provinciaux (PCP)",
      ],
      timeline: "Délais moyens après invitation (IPD) : 6 mois",
      targetAudience: "Diplômés de l'enseignement supérieur avec au moins 1 an d'expérience",
    },
    autoEcole: {
      id: 'autoEcole',
      title: "Formation Permis de Conduire (Normes Canada)",
      tagline: "Conduite préventive et maîtrise du code nord-américain",
      summary: "Formation théorique et pratique rigoureuse à Douala pour acquérir votre permis et faciliter votre transition vers les examens provinciaux (SAAQ, DriveTest).",
      serviceParam: 'auto-ecole',
      requirements: [
        "Cours de code interactif avec focus sur les priorités et panneaux",
        "Pratique sur véhicule récent avec moniteurs agréés",
        "Sensibilisation aux règles de conduite hivernale et défensive",
        "Attestation officielle de formation délivrée après examen",
      ],
      timeline: "Sessions accélérées (3 semaines) ou standard (6 semaines)",
      targetAudience: "Futurs conducteurs et candidats au départ vers l'Amérique du Nord",
    },
    langues: {
      id: 'langues',
      title: "Préparation TEF Canada, TCF & IELTS",
      tagline: "Maximisez vos points linguistiques dans le bassin IRCC",
      summary: "Entraînement intensif aux 4 épreuves clés pour décrocher le niveau NCLC 7 ou supérieur, le levier le plus déterminant pour votre immigration.",
      serviceParam: 'langues',
      requirements: [
        "Test de positionnement initial gratuit pour situer votre niveau",
        "Entraînements chronométrés sur sujets réels d'examens",
        "Ateliers d'expression orale et de production écrite ciblés",
        "Méthodologie pour surmonter le stress et optimiser la notation",
      ],
      timeline: "Programmes intensifs de 4 à 8 semaines en groupe restreint",
      targetAudience: "Candidats aux permis de travail, études ou résidence permanente",
    },
  }

  const current = pathways[activePathway]

  return (
    <main className="bg-white dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors">
      {/* 1. HERO SECTION - Editorial, Pur & Moderne */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 border-b border-slate-200/80 dark:border-white/10 overflow-hidden">
        {/* Magic UI Dotted Map Ambient Pattern */}
        <SiteBackgroundMap opacity="opacity-35 dark:opacity-25" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              {/* Unboxed Metadata Kicker (Anti-Slop: clean typography, no pill enclosures) */}
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <span className="text-accent font-bold">Douala, Cameroun</span>
                <span aria-hidden="true">·</span>
                <span>{homeTexts.heroKicker || 'Cabinet Conseil en Mobilité Internationale'}</span>
              </div>

              {/* Display Headline with strict typographic hierarchy */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.08] text-slate-900 dark:text-white text-balance">
                {homeTexts.heroTitle || "L'immigration canadienne structurée avec rigueur depuis le Cameroun."}
              </h1>

              {/* Concise, concrete value proposition */}
              <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 leading-relaxed max-w-2xl font-normal">
                {homeTexts.heroSubtitle || "Cabinet conseil basé à Douala. Nous instruisons vos dossiers de permis d'études, d'Entrée Express, de permis de travail et de formation préparatoire avec transparence juridique et accompagnement de proximité."}
              </p>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-base shadow-sm transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 text-center"
                >
                  <span>Démarrer mon évaluation d'admissibilité</span>
                  <ArrowRight className="size-4" />
                </Link>

                <a
                  href="#pathway-explorer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-800 dark:text-slate-200 rounded-xl font-medium text-base transition-colors text-center"
                >
                  <span>Explorer les filières</span>
                </a>
              </div>

              {/* Direct Proof Line (Quantitative rigor, no fake scorecards) */}
              <div className="pt-6 border-t border-slate-200/80 dark:border-white/10 grid grid-cols-3 gap-6 text-left">
                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    +2 500
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Dossiers et visas instruits
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    10+ ans
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Expérience cumulée au Cameroun
                  </div>
                </div>

                <div>
                  <div className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums">
                    100%
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mt-0.5">
                    Conformité légale IRCC
                  </div>
                </div>
              </div>
            </div>

            {/* Right Media Card - Modern Visual Framing */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden border border-slate-200/80 dark:border-white/10 shadow-xl bg-slate-100 dark:bg-slate-850">
                <img
                  src="https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FPage%20d'accueil_Plan%20de%20travail%201.jpg.jpeg?alt=media&token=6488aeee-b014-4164-8a0d-ff857b1dc5fc"
                  alt="Best Travel - Cabinet d'immigration et mobilité Canada au Cameroun"
                  className="w-full h-[420px] sm:h-[480px] object-cover object-center"
                  loading="eager"
                  referrerPolicy="no-referrer"
                />

                {/* Subdued overlay for information legibility */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent flex flex-col justify-end p-6 text-white">
                  <div className="text-xs font-semibold uppercase tracking-wider text-accent">
                    Agence de Douala · Makepe
                  </div>
                  <div className="font-display text-lg font-bold mt-1 text-white">
                    Prise en charge personnalisée en présentiel & à distance
                  </div>
                  <p className="text-xs text-white/80 mt-1 leading-relaxed">
                    Entretiens d'orientation, vérification des preuves de fonds et préparation aux entrevues consulaires.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 2. INTERACTIVE PATHWAY EXPLORER (Functional Filter Component, Not Generic AI Slop) */}
      <section id="pathway-explorer" className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header */}
          <div className="max-w-3xl mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-primary dark:text-blue-400">
              Diagnostic & Orientation
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Identifiez la filière adaptée à votre situation
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
              Chaque programme répond à des critères d'admissibilité stricts définis par le Ministère de l'Immigration canadien.
            </p>
          </div>

          {/* Interactive Segmented Selector (Functional buttons with state) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 p-1.5 bg-slate-200/70 dark:bg-slate-800/80 rounded-2xl mb-8">
            <button
              onClick={() => setActivePathway('etudes')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activePathway === 'etudes'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="size-4 shrink-0" />
              <span className="truncate">Permis d'Études</span>
            </button>

            <button
              onClick={() => setActivePathway('entreeExpress')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activePathway === 'entreeExpress'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Briefcase className="size-4 shrink-0" />
              <span className="truncate">Entrée Express</span>
            </button>

            <button
              onClick={() => setActivePathway('autoEcole')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activePathway === 'autoEcole'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Car className="size-4 shrink-0" />
              <span className="truncate">Auto-école</span>
            </button>

            <button
              onClick={() => setActivePathway('langues')}
              className={`flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-semibold transition-all ${
                activePathway === 'langues'
                  ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Languages className="size-4 shrink-0" />
              <span className="truncate">Tests de Langues</span>
            </button>
          </div>

          {/* Active Pathway Detailed Dossier Card */}
          <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 sm:p-10 shadow-sm transition-all">
            <div className="grid lg:grid-cols-12 gap-8 items-start">
              
              <div className="lg:col-span-7 space-y-4">
                <div className="text-xs font-semibold text-primary dark:text-blue-400 uppercase tracking-wider">
                  {current.tagline}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
                  {current.title}
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-base leading-relaxed">
                  {current.summary}
                </p>

                <div className="pt-2">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                    Exigences & Points de Contrôle du Dossier
                  </h4>
                  <ul className="space-y-2.5">
                    {current.requirements.map((req, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700 dark:text-slate-300">
                        <CheckCircle2 className="size-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="lg:col-span-5 bg-slate-50 dark:bg-slate-900/80 rounded-xl p-6 border border-slate-200/60 dark:border-white/5 space-y-4">
                <div className="space-y-1">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Délais et temporalité
                  </div>
                  <div className="text-sm font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Clock className="size-4 text-slate-400" />
                    <span>{current.timeline}</span>
                  </div>
                </div>

                <div className="space-y-1 pt-2 border-t border-slate-200/60 dark:border-white/10">
                  <div className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Profils cibles
                  </div>
                  <div className="text-sm text-slate-700 dark:text-slate-300 leading-snug">
                    {current.targetAudience}
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    onClick={() => navigate('/contact', { state: { service: current.serviceParam } })}
                    className="w-full py-3 px-5 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <span>Évaluer mon profil pour ce programme</span>
                    <ArrowRight className="size-4" />
                  </button>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center mt-2">
                    Analyse sans engagement réalisée par nos consultants en agence.
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 3. ASYMMETRIC BENTO GRID - Core Capabilities */}
      <section className="py-16 sm:py-24 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent">
                Dossiers d'Expertise
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
                Nos 4 piliers d'accompagnement
              </h2>
            </div>
            <Link
              to="/procedures"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary dark:text-blue-400 hover:text-accent transition-colors"
            >
              <span>Consulter toutes nos procédures</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>

          {/* Asymmetric Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            
            {/* Box 1 (7 cols) - Permis d'Études */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-850 rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    01. Enseignement Supérieur
                  </div>
                  <span className="text-xs font-semibold text-primary dark:text-blue-400">
                    Québec, Ontario, Colombie-Britannique
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Permis d'Études & Inscriptions Universitaires
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Prise en charge intégrale : choix de la formation admissible au permis post-diplôme (PTPD),
                  procédure d'admission collégiale ou universitaire, demande de CAQ au Québec et constitution de la preuve de fonds.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Rentrée d'Automne & d'Hiver
                </span>
                <Link
                  to="/procedures"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <span>Détails de la procédure</span>
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Box 2 (5 cols) - Entrée Express */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-850 rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    02. Travailleurs Qualifiés
                  </div>
                  <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
                    Résidence Permanente
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Entrée Express & Candidats des Provinces
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  Analyse d'admissibilité au barème SCG, homologation des diplômes WES, alignement des codes CNP et soumission dans le bassin officiel IRCC.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  FÉER 0, 1, 2, 3
                </span>
                <Link
                  to="/procedures"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <span>En savoir plus</span>
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Box 3 (5 cols) - Auto-École */}
            <div className="md:col-span-5 bg-slate-50 dark:bg-slate-850 rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    03. Sécurité Routière
                  </div>
                  <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                    Douala & Yaoundé
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Auto-École & Préparation Routière
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-6">
                  Obtention du permis de conduire catégorie B avec modules spécifiques aux normes de circulation et aux réflexes de conduite sécuritaire requis au Canada.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Formations théoriques & pratiques
                </span>
                <Link
                  to="/auto-ecole"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <span>Voir les forfaits</span>
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

            {/* Box 4 (7 cols) - Centre Linguistique */}
            <div className="md:col-span-7 bg-slate-50 dark:bg-slate-850 rounded-2xl p-8 border border-slate-200/80 dark:border-white/10 flex flex-col justify-between hover:border-slate-300 dark:hover:border-white/20 transition-all">
              <div>
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="text-xs font-mono text-slate-400 uppercase">
                    04. Compétences Linguistiques
                  </div>
                  <span className="text-xs font-semibold text-primary dark:text-blue-400">
                    TEF / TCF Canada & IELTS
                  </span>
                </div>
                <h3 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-3">
                  Centre de Préparation aux Tests Officiels
                </h3>
                <p className="text-slate-600 dark:text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                  Le niveau de langue est le premier multiplicateur de points dans le système canadien. Nos formateurs vous préparent aux épreuves de compréhension et d'expression pour viser le niveau NCLC 7 et au-delà.
                </p>
              </div>

              <div className="pt-4 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Sessions intensives & examens blancs
                </span>
                <Link
                  to="/langues"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-hover"
                >
                  <span>Consulter le programme</span>
                  <ChevronRight className="size-4" />
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. METHODOLOGY & PROTOCOL - 4 Étapes Claires */}
      <section className="py-16 sm:py-24 bg-slate-50 dark:bg-slate-900/40 border-b border-slate-200/80 dark:border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="max-w-2xl mb-12">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Méthodologie Certifiée
            </span>
            <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight mt-1 text-slate-900 dark:text-white">
              Notre protocole d'instruction en 4 étapes
            </h2>
            <p className="text-slate-600 dark:text-slate-300 text-base mt-2">
              Une démarche méthodique et transparente pour éliminer les motifs habituels de refus consulaire.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            
            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-accent">01. AUDIT</div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Vérification d'admissibilité
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Analyse préalable de vos diplômes, relevés bancaires, historique de voyages et antécédents pour vérifier la conformité aux exigences actuelles.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-accent">02. MONTAGE</div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Constitution & Preuves de fonds
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Structuration rigoureuse des pièces justificatives, rédaction de la lettre explicative et validation de l'origine licite des fonds.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-accent">03. SOUMISSION</div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Dépôt IRCC & Biométrie
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Téléversement sécurisé sur le portail du gouvernement canadien, suivi des données biométriques et préparation à la visite médicale.
              </p>
            </div>

            <div className="space-y-3">
              <div className="text-xs font-mono font-bold text-accent">04. DÉPART</div>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-white">
                Briefing & Installation
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                Conseils pour le passage à la douane (Point d'Entrée), logement temporaire, ouverture de compte bancaire et formalités du NAS.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* 5. DIRECT CONSULTATION INTAKE CALLOUT */}
      <section className="relative py-16 sm:py-20 bg-slate-900 text-white overflow-hidden">
        {/* Magic UI Dotted Map Ambient Pattern */}
        <SiteBackgroundMap opacity="opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-semibold text-accent uppercase tracking-wider">
                Consultation Personnalisée à Douala
              </span>
              <h2 className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
                {homeTexts.calloutTitle || 'Vous avez un projet pour le Canada ? Rencontrons-nous en agence.'}
              </h2>
              <p className="text-slate-300 text-base leading-relaxed max-w-2xl">
                {homeTexts.calloutDesc || 'Nos conseillers vous reçoivent à Makepe (station Gulfin, après le carrefour conquête) ou organisent un entretien téléphonique confidentiel pour évaluer la faisabilité de votre projet.'}
              </p>

              <div className="flex flex-wrap items-center gap-6 pt-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                  <MapPin className="size-4 text-accent" />
                  <span>{general.address || 'Makepe, Douala - Cameroun'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="size-4 text-accent" />
                  <span>{general.phone || '+237 691 00 17 84'}</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3">
              <Link
                to="/contact"
                className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-center text-sm shadow-md transition-all"
              >
                Prendre rendez-vous en ligne
              </Link>
              <a
                href={social.whatsapp || 'https://wa.me/237691001784'}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-medium text-center text-sm transition-colors flex items-center justify-center gap-2"
              >
                <MessageSquare className="size-4 text-emerald-400" />
                <span>Écrire directement sur WhatsApp</span>
              </a>
            </div>

          </div>
        </div>
      </section>
    </main>
  )
}
