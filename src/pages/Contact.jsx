import React, { useMemo, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import emailjs from '@emailjs/browser'
import { MapPin, Phone, Mail, Clock, MessageSquare, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react'
import SiteBackgroundMap from '../components/SiteBackgroundMap'
import { submitConsultationDossier } from '../lib/firebase'
import { useSiteContent } from '../context/SiteContentContext'

export default function Contact() {
  const navigate = useNavigate()
  const location = useLocation()
  const { content } = useSiteContent()

  const contactTexts = content.texts?.contact || {}
  const general = content.general || {}
  const social = content.socialLinks || {}

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: location.state?.service || 'permis-etude-canada',
    message: '',
  })

  const [status, setStatus] = useState({ loading: false, error: '' })

  const serviceLabel = useMemo(() => {
    const map = {
      'permis-etude-canada': "Permis d'Étude (Canada)",
      'entree-express-individuel': "Entrée Express (Individuel)",
      'entree-express-famille': "Entrée Express (Famille)",
      'visa-visiteur-italie': "Visa Visiteur Italie",
      'visa-etudiant-europe': "Visa Étudiant Europe",
      'visa-travail-autonome': "Visa Travail Autonome",
      'auto-ecole': 'Formation Permis de Conduire (Auto-école)',
      'langues': 'Cours & Préparation aux Tests (TEF/TCF/IELTS)',
      'autres': 'Assistance Preuve de Fonds & Autre',
    }
    return map[form.service] ?? "Permis d'Étude (Canada)"
  }, [form.service])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Veuillez entrer votre nom complet.'
    if (!form.email.trim()) return 'Veuillez entrer votre adresse email.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Format d’email invalide.'
    if (!form.phone.trim()) return 'Veuillez renseigner votre numéro de téléphone (WhatsApp).'
    return ''
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setStatus({ loading: false, error: '' })

    const err = validate()
    if (err) {
      setStatus({ loading: false, error: err })
      return
    }

    setStatus({ loading: true, error: '' })

    try {
      // 1. Persist dossier securely to Firebase Firestore
      try {
        await submitConsultationDossier({
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          service: serviceLabel,
          message: form.message,
        })
      } catch (firestoreErr) {
        console.warn('Firestore submission fallback:', firestoreErr)
      }

      const text = `*Nouvelle Demande d'Évaluation (Best Travel)*\n\n*Nom complet :* ${form.fullName}\n*Email :* ${form.email}\n*Téléphone :* ${form.phone}\n*Service :* ${serviceLabel}\n*Message :* ${form.message || '(Aucun message supplémentaire)'}`
      const whatsappUrl = `https://wa.me/237691001784?text=${encodeURIComponent(text)}`

      const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

      if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
        const templateParams = {
          full_name: form.fullName,
          email: form.email,
          phone: form.phone,
          service: serviceLabel,
          message: form.message || '(Aucun message)',
          source: 'Website Evaluation Request',
        }
        emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY).catch(console.error)
      }

      // Safe redirect without popup blocker issues
      navigate('/contact/success', {
        state: { whatsappUrl, fullName: form.fullName, serviceLabel },
        replace: true,
      })
    } catch {
      setStatus({
        loading: false,
        error: 'Une erreur technique est survenue. Vous pouvez nous joindre directement par téléphone.',
      })
    }
  }

  return (
    <main className="bg-white dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors pb-20">
      
      {/* Header */}
      <section className="relative pt-12 pb-14 sm:pt-16 sm:pb-20 border-b border-slate-200/80 dark:border-white/10 bg-slate-50 dark:bg-slate-900/40 overflow-hidden">
        {/* Magic UI Dotted Map Ambient Pattern */}
        <SiteBackgroundMap opacity="opacity-25 dark:opacity-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center max-w-3xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
            <span>Consultation & Étude de Profil</span>
            <span aria-hidden="true">·</span>
            <span>{contactTexts.headerKicker || 'Agence de Douala'}</span>
          </div>

          <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {contactTexts.headerTitle || 'Prendre Rendez-vous ou Obtenir un Devis'}
          </h1>

          <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
            {contactTexts.headerDesc || "Nos consultants examinent votre éligibilité selon les critères officiels d'IRCC. Remplissez ce formulaire pour planifier votre entretien en agence ou à distance."}
          </p>
        </div>
      </section>

      {/* Main 2-Column Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Office Information */}
            <div className="lg:col-span-5 space-y-8">
              
              <div className="bg-slate-50 dark:bg-slate-850 rounded-2xl p-6 sm:p-8 border border-slate-200/80 dark:border-white/10 space-y-6">
                <h2 className="font-display text-xl font-bold text-slate-900 dark:text-white">
                  Coordonnées du Cabinet
                </h2>

                <div className="space-y-4 text-sm text-slate-600 dark:text-slate-300">
                  <div className="flex items-start gap-3">
                    <MapPin className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Adresse physique</div>
                      <div className="mt-0.5 leading-relaxed">
                        {general.address || 'Makepe, station Gulfin après le carrefour conquête, Douala, Cameroun.'}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <Phone className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Ligne téléphonique directe</div>
                      <div className="mt-0.5 font-mono">{general.phone || '+237 691 00 17 84'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <Mail className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Courrier électronique</div>
                      <div className="mt-0.5 font-mono text-xs sm:text-sm">{general.email || 'besttravservice@gmail.com'}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 pt-3 border-t border-slate-200/60 dark:border-white/5">
                    <Clock className="size-5 text-accent shrink-0 mt-0.5" />
                    <div>
                      <div className="font-semibold text-slate-900 dark:text-white">Heures d'accueil</div>
                      <div className="mt-0.5">{general.openingHours || 'Lundi au Vendredi : 08h00 – 18h00 | Samedi : 09h00 – 14h00'}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fast WhatsApp Box */}
              <div className="bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 rounded-2xl p-6 space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-semibold text-sm">
                  <MessageSquare className="size-4" />
                  <span>Assistance Rapide via WhatsApp</span>
                </div>
                <p className="text-xs sm:text-sm text-emerald-900/80 dark:text-emerald-300/80 leading-relaxed">
                  Pour une question urgente ou pour transmettre directement une copie de vos documents pour avis préliminaire.
                </p>
                <a
                  href={social.whatsapp || 'https://wa.me/237691001784'}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline pt-1"
                >
                  <span>Contacter sur WhatsApp ({general.phone || '+237 691 00 17 84'})</span>
                  <ArrowRight className="size-3.5" />
                </a>
              </div>

            </div>

            {/* Right: Intake Form */}
            <div className="lg:col-span-7">
              <div className="bg-white dark:bg-slate-850 rounded-2xl border border-slate-200/80 dark:border-white/10 p-6 sm:p-10 shadow-sm">
                
                <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Formulaire d'audit initial
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
                  Tous les champs marqués d’un astérisque sont indispensables pour évaluer votre recevabilité.
                </p>

                {status.error && (
                  <div className="mb-6 p-4 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs sm:text-sm text-red-700 dark:text-red-300 font-medium">
                    {status.error}
                  </div>
                )}

                <form onSubmit={onSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Nom complet *
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={form.fullName}
                      onChange={onChange}
                      placeholder="Ex: Paul Atangana"
                      className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Adresse Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={onChange}
                        placeholder="votre.email@exemple.com"
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                        Numéro de téléphone (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={onChange}
                        placeholder="+237 6XX XX XX XX"
                        className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Programme ou filière souhaitée *
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={onChange}
                      className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-white"
                    >
                      <optgroup label="Immigration & Visas Canada">
                        <option value="permis-etude-canada">Permis d'Études (Canada)</option>
                        <option value="entree-express-individuel">Entrée Express - Travailleurs Qualifiés</option>
                        <option value="entree-express-famille">Regroupement Familial / Parrainage</option>
                        <option value="autres">Preuve de Fonds & Justificatifs Financiers</option>
                      </optgroup>
                      <optgroup label="Formations Spécialisées">
                        <option value="auto-ecole">Formation Conduite (Auto-école Best Travel)</option>
                        <option value="langues">Préparation Tests Linguistiques (TEF / TCF / IELTS)</option>
                      </optgroup>
                      <optgroup label="Mobilité Europe">
                        <option value="visa-etudiant-europe">Visa Étudiant Europe (France / Italie)</option>
                        <option value="visa-visiteur-italie">Mobilité Emploi Saisonnier Italie</option>
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1.5">
                      Détails de votre profil ou question
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={onChange}
                      placeholder="Précisez votre niveau d'études, votre profession actuelle, votre situation matrimoniale ou vos questions..."
                      className="w-full text-sm bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl py-3 px-4 focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-slate-400 dark:text-white"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={status.loading}
                    className="w-full py-4 px-6 bg-accent hover:bg-accent-hover text-white rounded-xl font-semibold text-sm transition-all duration-200 shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {status.loading ? (
                      <span>Transmission de votre demande en cours...</span>
                    ) : (
                      <>
                        <span>Transmettre mon dossier pour évaluation</span>
                        <ArrowRight className="size-4" />
                      </>
                    )}
                  </button>

                  <div className="flex items-center justify-center gap-2 text-[11px] text-slate-500 dark:text-slate-400 text-center pt-1">
                    <ShieldCheck className="size-3.5 text-emerald-500" />
                    <span>Vos données personnelles sont traitées dans le strict respect de la confidentialité.</span>
                  </div>
                </form>

              </div>
            </div>

          </div>
        </div>
      </section>

    </main>
  )
}
