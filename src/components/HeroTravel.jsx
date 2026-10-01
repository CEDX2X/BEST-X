import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function HeroTravel() {
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState('flights')
  const [lang, setLang] = useState('en') // 'en' matches screenshot verbatim, 'fr' for localized
  const [fromLocation, setFromLocation] = useState('New York, USA')
  const [toLocation, setToLocation] = useState('Anywhere')
  const [departDate, setDepartDate] = useState('2025-05-24')
  const [returnDate, setReturnDate] = useState('2025-05-31')
  const [travelers, setTravelers] = useState('2 Adults, 1 Child')
  const [favorites, setFavorites] = useState({ 1: false, 2: false, 3: false, 4: false })
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState(null)
  const [rotation, setRotation] = useState(0)

  const toggleFavorite = (id, e) => {
    e.stopPropagation()
    setFavorites(prev => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSwap = () => {
    setRotation(r => r + 180)
    const temp = fromLocation
    setFromLocation(toLocation === 'Anywhere' ? 'Montréal, Canada' : toLocation)
    setToLocation(temp)
  }

  const destinations = [
    {
      id: 1,
      name: 'Bali, Indonesia',
      price: '$899',
      priceFcfa: '550 000 FCFA',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=600&q=80',
      tag: 'Tropical Escape',
      desc: 'Plages paradisiaques, temples historiques et rizières luxuriantes. Forfait vol + hôtel inclus.',
    },
    {
      id: 2,
      name: 'Santorini, Greece',
      price: '$1,299',
      priceFcfa: '795 000 FCFA',
      image: 'https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=600&q=80',
      tag: 'Romantic Getaway',
      desc: 'Dômes bleus spectaculaires, falaises blanches et couchers de soleil inoubliables sur la mer Égée.',
    },
    {
      id: 3,
      name: 'Dubai, UAE',
      price: '$1,099',
      priceFcfa: '675 000 FCFA',
      image: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=600&q=80',
      tag: 'Luxury & Adventure',
      desc: 'Architecture futuriste, gratte-ciels iconiques, shopping de luxe et safari dans le désert.',
    },
    {
      id: 4,
      name: 'Maldives',
      price: '$1,499',
      priceFcfa: '920 000 FCFA',
      image: 'https://images.unsplash.com/photo-1514282401047-d79a71a590e8?auto=format&fit=crop&w=600&q=80',
      tag: 'Pure Paradise',
      desc: 'Villas sur pilotis au-dessus d’eaux cristallines turquoise, récifs coralliens et détente absolue.',
    },
  ]

  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearchOpen(true)
  }

  const handleBookViaWhatsApp = (dest) => {
    const text = `Bonjour Best Travel ! Je suis intéressé(e) par la destination : ${dest?.name || toLocation}.
Départ : ${fromLocation}
Date : ${departDate} au ${returnDate}
Voyageurs : ${travelers}
Pouvez-vous me transmettre les détails et disponibilités ?`
    window.open(`https://wa.me/237691001784?text=${encodeURIComponent(text)}`, '_blank')
  }

  return (
    <div className="relative w-full overflow-hidden bg-slate-900 select-none">
      {/* ========================================================================= */}
      {/* PANORAMIC WORLD TRAVEL HERO BACKGROUND (MATCHING THE SCREENSHOT EXACTLY)   */}
      {/* ========================================================================= */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sunny Blue Sky Gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b63b6] via-[#218beb] to-[#71c3ff]" />

        {/* Soft Ambient Radial Sun Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-gradient-to-b from-white/30 via-sky-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Atmospheric Floating Clouds */}
        <div className="absolute top-12 left-10 w-96 h-32 bg-white/25 rounded-full blur-2xl animate-pulse duration-1000" />
        <div className="absolute top-20 right-16 w-80 h-28 bg-white/20 rounded-full blur-2xl" />
        <div className="absolute top-44 left-1/3 w-64 h-20 bg-white/20 rounded-full blur-xl" />

        {/* Jet Airplane #1 (Top Left flying right with vapor contrail) */}
        <div className="absolute top-16 sm:top-20 left-6 sm:left-24 z-10 opacity-90 transform -rotate-[8deg] transition-transform hover:scale-105">
          <div className="relative flex items-center">
            {/* Contrail trail */}
            <div className="w-24 sm:w-44 h-[2px] bg-gradient-to-l from-white/70 to-transparent mr-1 blur-[0.5px]" />
            {/* Plane Graphic */}
            <svg className="w-12 h-12 sm:w-16 sm:h-16 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

        {/* Jet Airplane #2 (Top Right flying left with vapor contrails) */}
        <div className="absolute top-14 sm:top-16 right-4 sm:right-28 z-10 opacity-90 transform rotate-[192deg] transition-transform hover:scale-105">
          <div className="relative flex items-center">
            <div className="w-20 sm:w-36 h-[2px] bg-gradient-to-l from-white/70 to-transparent mr-1 blur-[0.5px]" />
            <svg className="w-10 h-10 sm:w-14 sm:h-14 text-white drop-shadow-md" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21 16v-2l-8-5V3.5c0-.83-.67-1.5-1.5-1.5S10 2.67 10 3.5V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" />
            </svg>
          </div>
        </div>

        {/* Flock of birds in sky */}
        <div className="absolute top-28 left-[18%] opacity-60 hidden md:block">
          <span className="text-white text-xs tracking-widest font-mono">v  v   v</span>
        </div>

        {/* ========================================================================= */}
        {/* WORLD LANDMARKS PANORAMA (Pisa, Eiffel, Taj Mahal, Liberty, Skyline)      */}
        {/* ========================================================================= */}
        <div className="absolute bottom-0 left-0 right-0 h-[380px] sm:h-[480px] flex items-end justify-center pointer-events-none">
          {/* Composite Landmarks Silhouette / Art Layer */}
          <div className="relative w-full max-w-[1700px] h-full flex items-end justify-between px-2 sm:px-12 opacity-85">
            {/* 1. Leaning Tower of Pisa (Left) */}
            <div className="relative -mb-4 -ml-4 sm:ml-4 w-24 sm:w-36 h-56 sm:h-80 flex-shrink-0 transform -rotate-[9deg] origin-bottom drop-shadow-2xl">
              <svg viewBox="0 0 100 240" className="w-full h-full text-stone-200/90 fill-current">
                {/* Pisa Tower silhouette / architectural tiers */}
                <rect x="30" y="210" width="40" height="30" rx="3" className="fill-stone-300" />
                <rect x="28" y="175" width="44" height="32" rx="2" className="fill-stone-200" />
                <rect x="29" y="140" width="42" height="32" rx="2" className="fill-stone-300" />
                <rect x="30" y="105" width="40" height="32" rx="2" className="fill-stone-200" />
                <rect x="32" y="70" width="36" height="32" rx="2" className="fill-stone-300" />
                <rect x="34" y="35" width="32" height="32" rx="2" className="fill-stone-200" />
                <rect x="38" y="15" width="24" height="20" rx="2" className="fill-stone-300" />
                <path d="M42 15 L50 2 L58 15 Z" className="fill-stone-400" />
                {/* Column details */}
                <line x1="33" y1="35" x2="33" y2="210" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="45" y1="35" x2="45" y2="210" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="57" y1="35" x2="57" y2="210" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />
                <line x1="67" y1="35" x2="67" y2="210" stroke="#78716c" strokeWidth="1" strokeDasharray="3 3" />
              </svg>
            </div>

            {/* 2. Eiffel Tower (Mid-Left) */}
            <div className="relative -mb-6 w-32 sm:w-56 h-72 sm:h-[420px] flex-shrink-0 drop-shadow-2xl">
              <svg viewBox="0 0 160 380" className="w-full h-full text-amber-100/90 fill-current">
                {/* Spire */}
                <line x1="80" y1="0" x2="80" y2="50" stroke="#78716c" strokeWidth="3" />
                <rect x="76" y="50" width="8" height="15" className="fill-stone-400" />
                {/* Top Section */}
                <polygon points="74,65 86,65 89,140 71,140" className="fill-stone-400" />
                <rect x="65" y="140" width="30" height="8" rx="2" className="fill-stone-500" />
                {/* Mid Section with lattice */}
                <polygon points="69,148 91,148 98,240 62,240" className="fill-stone-400" />
                <rect x="52" y="240" width="56" height="12" rx="2" className="fill-stone-500" />
                {/* Base Section & Arch */}
                <polygon points="56,252 104,252 125,380 98,380 80,300 62,380 35,380" className="fill-stone-500" />
                <path d="M 52 380 Q 80 290 108 380 Z" className="fill-sky-300/40" />
              </svg>
            </div>

            {/* 3. Taj Mahal (Center behind glass card) */}
            <div className="relative -mb-4 w-44 sm:w-72 h-56 sm:h-80 flex-shrink-0 opacity-80 drop-shadow-2xl hidden sm:block">
              <svg viewBox="0 0 240 180" className="w-full h-full text-stone-100/90 fill-current">
                {/* Left Minaret */}
                <rect x="15" y="40" width="8" height="140" className="fill-stone-300" />
                <circle cx="19" cy="38" r="5" className="fill-stone-200" />
                {/* Right Minaret */}
                <rect x="217" y="40" width="8" height="140" className="fill-stone-300" />
                <circle cx="221" cy="38" r="5" className="fill-stone-200" />
                {/* Central Building Base */}
                <rect x="45" y="80" width="150" height="100" rx="3" className="fill-stone-200" />
                {/* Large Center Arch */}
                <path d="M 95 180 L 95 125 Q 120 95 145 125 L 145 180 Z" className="fill-stone-400" />
                {/* Side Arches */}
                <path d="M 60 170 L 60 140 Q 72 125 84 140 L 84 170 Z" className="fill-stone-400" />
                <path d="M 156 170 L 156 140 Q 168 125 180 140 L 180 170 Z" className="fill-stone-400" />
                {/* Side Domes */}
                <path d="M 65 80 Q 75 55 85 80 Z" className="fill-stone-100" />
                <path d="M 155 80 Q 165 55 175 80 Z" className="fill-stone-100" />
                {/* Center Majestic Onion Dome */}
                <path d="M 90 80 C 85 40 120 15 120 10 C 120 15 155 40 150 80 Z" className="fill-stone-100" />
                <line x1="120" y1="0" x2="120" y2="10" stroke="#d6d3d1" strokeWidth="2" />
              </svg>
            </div>

            {/* 4. Statue of Liberty (Mid-Right) */}
            <div className="relative -mb-6 w-28 sm:w-48 h-64 sm:h-[390px] flex-shrink-0 drop-shadow-2xl">
              <svg viewBox="0 0 140 320" className="w-full h-full text-emerald-200/90 fill-current">
                {/* Pedestal Base */}
                <rect x="40" y="240" width="60" height="80" rx="2" className="fill-stone-300" />
                <rect x="46" y="210" width="48" height="30" rx="2" className="fill-stone-400" />
                {/* Robe Body */}
                <polygon points="50,210 90,210 82,100 56,100" className="fill-emerald-300" />
                {/* Crown Spikes & Head */}
                <circle cx="68" cy="80" r="14" className="fill-emerald-200" />
                <polygon points="68,60 62,75 74,75" className="fill-emerald-400" />
                <polygon points="56,64 58,78 68,76" className="fill-emerald-400" />
                <polygon points="80,64 68,76 78,78" className="fill-emerald-400" />
                {/* Raised Torch Arm */}
                <polygon points="76,96 100,50 108,54 84,104" className="fill-emerald-300" />
                {/* Golden Flame */}
                <circle cx="106" cy="46" r="6" className="fill-amber-300 drop-shadow-lg" />
                <path d="M106 38 C 109 44 113 46 106 52 C 100 46 103 44 106 38 Z" className="fill-amber-400" />
                {/* Tablet arm */}
                <rect x="48" y="112" width="16" height="24" rx="2" className="fill-emerald-400" />
              </svg>
            </div>

            {/* 5. Modern City Skyline / Skyscrapers (Right) */}
            <div className="relative -mb-4 -mr-4 sm:mr-4 w-32 sm:w-60 h-60 sm:h-96 flex-shrink-0 drop-shadow-2xl">
              <svg viewBox="0 0 180 280" className="w-full h-full text-sky-100/90 fill-current">
                {/* Freedom Tower / One WTC Spire */}
                <line x1="90" y1="10" x2="90" y2="40" stroke="#cbd5e1" strokeWidth="2" />
                <polygon points="75,40 105,40 115,280 65,280" className="fill-slate-200" />
                <polygon points="90,40 105,40 115,280 90,280" className="fill-slate-300" />
                {/* Background Glass Towers */}
                <rect x="15" y="90" width="45" height="190" className="fill-slate-300" />
                <polygon points="15,90 35,60 60,90" className="fill-slate-400" />
                <rect x="120" y="110" width="50" height="170" className="fill-slate-200" />
                <polygon points="120,110 145,85 170,110" className="fill-slate-300" />
                {/* Window patterns */}
                <line x1="25" y1="100" x2="25" y2="270" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="45" y1="100" x2="45" y2="270" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="135" y1="120" x2="135" y2="270" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="155" y1="120" x2="155" y2="270" stroke="#94a3b8" strokeWidth="1" strokeDasharray="4 4" />
              </svg>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* CURVED EARTH GLOBE HORIZON (AT THE BOTTOM WITH CONTINENTS & OCEAN)         */}
        {/* ========================================================================= */}
        <div className="absolute -bottom-[650px] sm:-bottom-[720px] left-1/2 -translate-x-1/2 w-[1600px] sm:w-[2200px] h-[900px] rounded-[100%] bg-gradient-to-b from-[#1b5cb8] via-[#0e3b79] to-[#041935] border-t-4 border-sky-300/60 shadow-[0_-20px_60px_rgba(56,189,248,0.5)]">
          {/* Subtle continent textures on globe curve */}
          <div className="absolute top-12 left-1/4 w-72 h-36 bg-emerald-600/30 rounded-full blur-xl" />
          <div className="absolute top-8 right-1/4 w-96 h-44 bg-emerald-600/25 rounded-full blur-2xl" />
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-80 h-28 bg-emerald-500/20 rounded-full blur-xl" />
          {/* Atmospheric blue haze layer along edge */}
          <div className="absolute top-0 inset-x-0 h-16 bg-gradient-to-b from-sky-300/40 to-transparent" />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* HERO CONTENT: HEADLINE, PILL BADGE & ACTION BUTTONS                       */}
      {/* ========================================================================= */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 pt-10 sm:pt-14 pb-20 sm:pb-28 text-center flex flex-col items-center">
        
        {/* Language switch mini-pill (FR / EN toggle to appreciate exact design or localized version) */}
        <div className="mb-4 inline-flex items-center gap-1.5 p-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-xs font-semibold text-white shadow-sm">
          <button
            onClick={() => setLang('en')}
            className={`px-3 py-1 rounded-full transition-all ${lang === 'en' ? 'bg-white text-blue-700 shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            English (Design original)
          </button>
          <button
            onClick={() => setLang('fr')}
            className={`px-3 py-1 rounded-full transition-all ${lang === 'fr' ? 'bg-white text-blue-700 shadow-sm' : 'text-white/80 hover:text-white'}`}
          >
            Français (Best Travel)
          </button>
        </div>

        {/* AI-POWERED TRAVEL PLANNER Pill Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/40 text-white text-xs sm:text-sm font-semibold tracking-wide shadow-md hover:bg-white/25 transition-all">
          <span className="material-symbols-outlined text-amber-300 text-base">auto_awesome</span>
          <span>{lang === 'en' ? 'AI-POWERED TRAVEL PLANNER' : 'PLANIFICATEUR DE VOYAGE INTELLIGENT & CONSEIL'}</span>
        </div>

        {/* Main Headline (Matching the screenshot typography and weight) */}
        <h1 className="mt-5 text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white tracking-tight leading-[1.1] drop-shadow-md max-w-4xl">
          {lang === 'en' ? 'Explore the World With Confidence' : 'Explorez le Monde en Toute Sérénité'}
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-5 text-base sm:text-xl text-white/90 max-w-2xl font-normal leading-relaxed drop-shadow">
          {lang === 'en'
            ? 'Seamless global travel planning, personalized experiences, and trusted booking — all in one place.'
            : "Accompagnement expert pour vos billets d'avion, visas d'études, résidence permanente au Canada & Europe, et auto-école."}
        </p>

        {/* Action Buttons */}
        <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={() => navigate('/contact')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-blue-600 hover:bg-blue-500 active:scale-95 text-white font-bold text-base sm:text-lg shadow-xl shadow-blue-900/30 flex items-center gap-2 transition-all group"
          >
            <span>{lang === 'en' ? 'Start Your Journey' : 'Commencer votre projet'}</span>
            <span className="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1">arrow_forward</span>
          </button>

          <button
            onClick={() => navigate('/procedures')}
            className="px-6 sm:px-8 py-3.5 sm:py-4 rounded-full bg-white/15 hover:bg-white/25 active:scale-95 text-white border border-white/40 backdrop-blur-md font-semibold text-base sm:text-lg shadow-lg flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined text-xl text-sky-200">explore</span>
            <span>{lang === 'en' ? 'View Destinations' : 'Nos Destinations'}</span>
            <span className="text-white/70 text-sm">↗</span>
          </button>
        </div>

        {/* ========================================================================= */}
        {/* CENTERPIECE: THE GLASSMORPHISM BOOKING & SEARCH UI CARD                   */}
        {/* ========================================================================= */}
        <div className="mt-10 sm:mt-14 w-full max-w-5xl rounded-3xl bg-white/20 dark:bg-slate-900/40 backdrop-blur-2xl border border-white/50 dark:border-white/20 shadow-2xl p-4 sm:p-6 text-left ring-1 ring-white/30 transition-all">
          
          {/* Top Tabs (Flights, Hotels, Cars, Cruises) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-3 sm:pb-4 border-b border-white/20 scrollbar-none">
            <button
              onClick={() => setActiveTab('flights')}
              className={`px-5 py-2.5 rounded-full text-sm font-bold flex items-center gap-2 transition-all shadow-sm ${
                activeTab === 'flights'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">flight</span>
              <span>{lang === 'en' ? 'Flights' : 'Vols & Billetterie'}</span>
            </button>

            <button
              onClick={() => setActiveTab('hotels')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'hotels'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">hotel</span>
              <span>{lang === 'en' ? 'Hotels' : 'Hôtels & Logements'}</span>
            </button>

            <button
              onClick={() => setActiveTab('cars')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'cars'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">directions_car</span>
              <span>{lang === 'en' ? 'Cars / Auto-école' : 'Auto-école & Conduite'}</span>
            </button>

            <button
              onClick={() => setActiveTab('visas')}
              className={`px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 transition-all ${
                activeTab === 'visas'
                  ? 'bg-white text-blue-600 shadow-md scale-105'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              }`}
            >
              <span className="material-symbols-outlined text-lg">school</span>
              <span>{lang === 'en' ? 'Study & Visas' : "Visas & Procédures"}</span>
            </button>
          </div>

          {/* Search Inputs Bar (Frosted white pill bar with clean dividers) */}
          <form onSubmit={handleSearch} className="mt-4 sm:mt-5 bg-white/90 dark:bg-slate-900/90 rounded-2xl p-2 sm:p-3 shadow-xl backdrop-blur-md">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-2 sm:gap-0 items-center lg:divide-x divide-slate-200 dark:divide-slate-800">
              
              {/* FROM Input */}
              <div className="lg:col-span-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'From' : 'Départ'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="material-symbols-outlined text-slate-400 text-lg">location_on</span>
                  <input
                    type="text"
                    value={fromLocation}
                    onChange={(e) => setFromLocation(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-800 dark:text-white text-sm focus:outline-none placeholder:text-slate-400"
                    placeholder="Ville de départ"
                  />
                </div>
              </div>

              {/* Swap Button (between From & To) */}
              <div className="hidden lg:flex items-center justify-center -mx-3 z-10">
                <button
                  type="button"
                  onClick={handleSwap}
                  className="w-8 h-8 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm flex items-center justify-center text-slate-500 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all"
                  title="Permuter"
                >
                  <span
                    className="material-symbols-outlined text-base transition-transform duration-300"
                    style={{ transform: `rotate(${rotation}deg)` }}
                  >
                    swap_horiz
                  </span>
                </button>
              </div>

              {/* TO Input */}
              <div className="lg:col-span-3 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'To' : 'Destination'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="material-symbols-outlined text-slate-400 text-lg">flight_land</span>
                  <input
                    type="text"
                    value={toLocation}
                    onChange={(e) => setToLocation(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-800 dark:text-white text-sm focus:outline-none placeholder:text-slate-400"
                    placeholder="Pays ou ville"
                  />
                </div>
              </div>

              {/* DEPART Date */}
              <div className="lg:col-span-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'Depart' : 'Aller'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="material-symbols-outlined text-slate-400 text-lg">calendar_today</span>
                  <input
                    type="date"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* RETURN Date */}
              <div className="lg:col-span-2 px-3 py-2 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-xl transition-colors">
                <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  {lang === 'en' ? 'Return' : 'Retour'}
                </span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="material-symbols-outlined text-slate-400 text-lg">event</span>
                  <input
                    type="date"
                    value={returnDate}
                    onChange={(e) => setReturnDate(e.target.value)}
                    className="w-full bg-transparent font-semibold text-slate-800 dark:text-white text-xs sm:text-sm focus:outline-none cursor-pointer"
                  />
                </div>
              </div>

              {/* TRAVELERS & SEARCH BUTTON */}
              <div className="lg:col-span-2 px-2 py-1 flex items-center justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {lang === 'en' ? 'Travelers' : 'Voyageurs'}
                  </span>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span className="material-symbols-outlined text-slate-400 text-base">group</span>
                    <select
                      value={travelers}
                      onChange={(e) => setTravelers(e.target.value)}
                      className="bg-transparent font-semibold text-slate-800 dark:text-white text-xs focus:outline-none cursor-pointer truncate"
                    >
                      <option value="1 Adult" className="text-slate-800">1 Adulte</option>
                      <option value="2 Adults" className="text-slate-800">2 Adultes</option>
                      <option value="2 Adults, 1 Child" className="text-slate-800">2 Adultes, 1 Enfant</option>
                      <option value="Famille (4+)" className="text-slate-800">Famille (4+)</option>
                      <option value="Étudiant / Candidat" className="text-slate-800">Étudiant / Candidat</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="px-4 sm:px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-bold text-sm shadow-md flex items-center justify-center gap-1.5 transition-all flex-shrink-0"
                >
                  <span>{lang === 'en' ? 'Search' : 'Chercher'}</span>
                  <span className="material-symbols-outlined text-base">search</span>
                </button>
              </div>

            </div>
          </form>

          {/* Lower Strip: AI SUGGESTIONS FOR YOU + 4 Destination Cards */}
          <div className="mt-5 pt-4 border-t border-white/20">
            <div className="flex items-center justify-between mb-3 text-white">
              <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-white/90">
                <span className="material-symbols-outlined text-amber-300 text-sm">auto_awesome</span>
                <span>{lang === 'en' ? 'AI SUGGESTIONS FOR YOU' : 'SUGGESTIONS INTELLIGENTES RECOMMANDÉES'}</span>
              </div>
              <button
                onClick={() => navigate('/procedures')}
                className="text-xs text-white/80 hover:text-white font-semibold flex items-center gap-1 transition-colors"
              >
                <span>{lang === 'en' ? 'See more ideas' : "Voir d'autres offres"}</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>

            {/* 4 Cards Grid (matching the exact 4 cards in the screenshot) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
              {destinations.map((dest) => (
                <div
                  key={dest.id}
                  onClick={() => setSelectedDestination(dest)}
                  className="group relative bg-white/20 dark:bg-slate-800/50 hover:bg-white/30 dark:hover:bg-slate-800/80 rounded-2xl p-2.5 sm:p-3 border border-white/30 dark:border-white/10 backdrop-blur-md shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
                >
                  <div className="relative w-full h-24 sm:h-28 rounded-xl overflow-hidden mb-2.5">
                    <img
                      src={dest.image}
                      alt={dest.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                    
                    {/* Favorite Heart Button */}
                    <button
                      onClick={(e) => toggleFavorite(dest.id, e)}
                      className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-sm flex items-center justify-center text-white transition-all active:scale-90"
                      aria-label="Ajouter aux favoris"
                    >
                      <span className={`material-symbols-outlined text-sm transition-colors ${favorites[dest.id] ? 'text-red-500 font-bold' : 'text-white'}`}>
                        {favorites[dest.id] ? 'favorite' : 'favorite_border'}
                      </span>
                    </button>

                    <div className="absolute bottom-1.5 left-2">
                      <span className="px-2 py-0.5 rounded-md bg-white/25 backdrop-blur-sm text-[10px] font-bold text-white uppercase tracking-wider">
                        {dest.tag}
                      </span>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-white font-bold text-xs sm:text-sm truncate drop-shadow-sm">
                      {dest.name}
                    </h3>
                    <div className="mt-1 flex items-baseline justify-between">
                      <span className="text-[11px] text-white/70">
                        {lang === 'en' ? 'from' : 'dès'}
                      </span>
                      <span className="text-xs sm:text-sm font-extrabold text-white">
                        {lang === 'en' ? dest.price : dest.priceFcfa}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* ========================================================================= */}
      {/* 4 TRUST BADGES ROW (DIRECTLY BELOW HERO AS IN SCREENSHOT)                 */}
      {/* ========================================================================= */}
      <div className="relative z-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800 py-6 sm:py-8 px-4 transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          
          {/* Badge 1: Best Price Guarantee */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">verified_user</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? 'Best Price Guarantee' : 'Garantie Meilleur Tarif'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'en' ? 'We match the best prices' : 'Des prix compétitifs et transparents'}
              </p>
            </div>
          </div>

          {/* Badge 2: 24/7 Travel Support */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">support_agent</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? '24/7 Travel Support' : 'Support Client 24/7'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'en' ? 'Always here when you need us' : 'Conseillers dédiés à Douala & Yaoundé'}
              </p>
            </div>
          </div>

          {/* Badge 3: Secure Booking */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">security</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? 'Secure Booking' : 'Dossiers 100% Sécurisés'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'en' ? 'Your data is 100% protected' : 'Confidentialité et suivi rigoureux'}
              </p>
            </div>
          </div>

          {/* Badge 4: Trusted by Millions */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined text-2xl sm:text-3xl">star</span>
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                {lang === 'en' ? 'Trusted by Millions' : 'Recommandé par des Milliers'}
              </h4>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {lang === 'en' ? '10M+ happy travelers worldwide' : '+ de 2 500 visas et voyages concrétisés'}
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* INTERACTIVE DESTINATION MODAL / SEARCH DETAIL DRAWER                      */}
      {/* ========================================================================= */}
      {(isSearchOpen || selectedDestination) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-100 dark:border-slate-800 text-left relative overflow-hidden">
            
            <button
              onClick={() => {
                setIsSearchOpen(false)
                setSelectedDestination(null)
              }}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center justify-center transition-colors"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>

            {selectedDestination ? (
              <div>
                <div className="h-44 -mx-6 -mt-6 mb-4 overflow-hidden relative">
                  <img
                    src={selectedDestination.image}
                    alt={selectedDestination.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-6">
                    <span className="px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                      {selectedDestination.tag}
                    </span>
                    <h3 className="text-2xl font-extrabold text-white mt-1">
                      {selectedDestination.name}
                    </h3>
                  </div>
                </div>

                <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed mb-4">
                  {selectedDestination.desc}
                </p>

                <div className="bg-slate-50 dark:bg-slate-800/60 rounded-2xl p-4 mb-5 border border-slate-100 dark:border-slate-700/60">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-semibold">Tarif indicatif :</span>
                    <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                      {selectedDestination.price} ({selectedDestination.priceFcfa})
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-green-500">check_circle</span>
                    <span>Accompagnement administratif et formalités d'embarquement inclus</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookViaWhatsApp(selectedDestination)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-green-600 hover:bg-green-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-green-600/20 active:scale-95 transition-all"
                  >
                    <span>Réserver via WhatsApp</span>
                    <span className="material-symbols-outlined text-lg">chat</span>
                  </button>

                  <button
                    onClick={() => {
                      setSelectedDestination(null)
                      setIsSearchOpen(false)
                      navigate('/contact')
                    }}
                    className="py-3.5 px-5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-semibold text-sm transition-all"
                  >
                    Devis gratuit
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-950/50 text-blue-600 text-xs font-bold mb-3">
                  <span className="material-symbols-outlined text-sm">flight</span>
                  <span>Recherche d'itinéraire personnalisée</span>
                </div>

                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                  Votre demande de réservation
                </h3>

                <div className="space-y-3 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-100 dark:border-slate-700 text-sm mb-4">
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Trajet :</span>
                    <span className="font-bold text-slate-900 dark:text-white">{fromLocation} → {toLocation}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200 dark:border-slate-700">
                    <span className="text-slate-500">Dates :</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{departDate} au {returnDate}</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500">Voyageurs :</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{travelers}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">
                  Nos conseillers Best Travel recherchent en temps réel les meilleures compagnies et tarifs adaptés à votre demande.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={() => handleBookViaWhatsApp(null)}
                    className="flex-1 py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-600/30 active:scale-95 transition-all"
                  >
                    <span>Recevoir l'offre sur WhatsApp</span>
                    <span className="material-symbols-outlined text-lg">send</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsSearchOpen(false)
                      navigate('/contact')
                    }}
                    className="py-3.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-white font-semibold text-sm transition-all"
                  >
                    Formulaire
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

    </div>
  )
}
