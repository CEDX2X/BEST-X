import React, { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import emailjs from '@emailjs/browser'

export default function Contact() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    service: 'immigration',
    message: '',
  })

  const [status, setStatus] = useState({ loading: false, error: '' })

  const serviceLabel = useMemo(() => {
    const map = {
      immigration: 'Immigration Canada',
      'auto-ecole': 'Auto-école',
      langues: 'Cours de Langues (TEF/TCF/IELTS)',
      autres: 'Autres informations',
    }
    return map[form.service] ?? 'Immigration Canada'
  }, [form.service])

  const onChange = (e) => {
    const { name, value } = e.target
    setForm((s) => ({ ...s, [name]: value }))
  }

  const validate = () => {
    if (!form.fullName.trim()) return 'Veuillez entrer votre nom complet.'
    if (!form.email.trim()) return 'Veuillez entrer votre email.'
    if (!/^\S+@\S+\.\S+$/.test(form.email.trim())) return 'Email invalide.'
    if (!form.phone.trim()) return 'Veuillez entrer votre téléphone.'
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

    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      setStatus({
        loading: false,
        error:
          'Configuration EmailJS manquante (.env). Ajoute VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID, VITE_EMAILJS_PUBLIC_KEY.',
      })
      return
    }

    setStatus({ loading: true, error: '' })

    try {
      const templateParams = {
        full_name: form.fullName,
        email: form.email,
        phone: form.phone,
        service: serviceLabel,
        message: form.message || '(Aucun message)',
        source: 'Website Contact Form',
      }

      await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      setForm({ fullName: '', email: '', phone: '', service: 'immigration', message: '' })
      navigate('/contact/success', { replace: true })
    } catch {
      setStatus({
        loading: false,
        error: "Échec d’envoi. Vérifie EmailJS (Service/Template/Public key + variables du template).",
      })
    }
  }

  return (
    <main className="bg-white">
      <section className="px-6 py-10 text-center bg-slate-50 border-b border-slate-100">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-bold uppercase tracking-wider mb-4">
          <span className="material-symbols-outlined text-sm">support_agent</span>
          Expertise Locale & Internationale
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-primary leading-tight">Contactez-nous</h1>
        <p className="mt-4 text-slate-600 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto">
          Nos conseillers à Douala et Yaoundé sont là pour transformer votre rêve en réalité.
        </p>
      </section>

      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-6 sm:p-8 shadow-xl shadow-slate-200/50 border border-slate-100">
          <form className="space-y-5" onSubmit={onSubmit}>
            {status.error && (
              <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 font-semibold">
                {status.error}
              </div>
            )}

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Nom complet</label>
              <input
                name="fullName"
                value={form.fullName}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder:text-slate-400"
                placeholder="Ex: Jean Mukoko"
                type="text"
                autoComplete="name"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Email</label>
              <input
                name="email"
                value={form.email}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder:text-slate-400"
                placeholder="votre@email.com"
                type="email"
                autoComplete="email"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Téléphone</label>
              <div className="flex gap-2">
                <div className="bg-slate-100 rounded-xl px-4 flex items-center text-sm font-bold border border-slate-200">+237</div>
                <input
                  name="phone"
                  value={form.phone}
                  onChange={onChange}
                  className="flex-1 bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder:text-slate-400"
                  placeholder="6XX XXX XXX"
                  type="tel"
                  autoComplete="tel"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Service souhaité</label>
              <div className="relative">
                <select
                  name="service"
                  value={form.service}
                  onChange={onChange}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all appearance-none text-slate-700"
                >
                  <option value="immigration">Immigration Canada</option>
                  <option value="auto-ecole">Auto-école</option>
                  <option value="langues">Cours de Langues (TEF/TCF/IELTS)</option>
                  <option value="autres">Autres informations</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400">expand_more</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Message (Optionnel)</label>
              <textarea
                name="message"
                value={form.message}
                onChange={onChange}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3.5 px-4 focus:ring-2 focus:ring-accent/20 focus:border-accent outline-none transition-all placeholder:text-slate-400"
                placeholder="Comment pouvons-nous vous aider ?"
                rows={4}
              />
            </div>

            <div className="pt-2">
              <button
                disabled={status.loading}
                className={`w-full font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 ${
                  status.loading
                    ? 'bg-slate-300 text-slate-700 cursor-not-allowed'
                    : 'bg-accent hover:bg-red-700 text-white shadow-accent/30 active:scale-[0.98]'
                }`}
                type="submit"
              >
                <span className="text-lg">{status.loading ? 'Envoi en cours...' : 'Envoyer ma demande'}</span>
                <span className="material-symbols-outlined">{status.loading ? 'hourglass_top' : 'send'}</span>
              </button>
              <p className="mt-3 text-xs text-slate-500 text-center">En soumettant ce formulaire, vous acceptez d’être recontacté par notre équipe.</p>
            </div>
          </form>
        </div>
      </section>
    </main>
  )
}
