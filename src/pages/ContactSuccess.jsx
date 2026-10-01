import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckCircle2, MessageSquare, ArrowRight, Home } from 'lucide-react'

export default function ContactSuccess() {
  const location = useLocation()
  const whatsappUrl = location.state?.whatsappUrl
  const fullName = location.state?.fullName

  return (
    <main className="bg-slate-50 dark:bg-slate-925 text-slate-900 dark:text-slate-100 transition-colors py-16 sm:py-24">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <div className="bg-white dark:bg-slate-850 border border-slate-200/80 dark:border-white/10 rounded-2xl p-8 sm:p-12 text-center shadow-sm">
          
          <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="size-7" />
          </div>

          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
            Dossier Transmis
          </span>

          <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            Demande bien reçue{fullName ? `, ${fullName}` : ''}
          </h1>

          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            Votre dossier d'évaluation a été enregistré par notre secrétariat. Un conseiller spécialisé
            va étudier vos pièces et prendre contact avec vous sous 24 à 48 heures ouvrées.
          </p>

          {whatsappUrl && (
            <div className="mt-8 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/40 text-left space-y-3">
              <div className="text-xs font-semibold text-emerald-900 dark:text-emerald-300 flex items-center gap-1.5">
                <MessageSquare className="size-4" />
                <span>Accélérer votre prise en charge</span>
              </div>
              <p className="text-xs text-emerald-800 dark:text-emerald-300/80 leading-relaxed">
                Vous pouvez envoyer un message direct avec vos coordonnées à notre équipe d'accueil sur WhatsApp :
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors shadow-sm"
              >
                <span>Ouvrir la conversation WhatsApp</span>
                <ArrowRight className="size-3.5" />
              </a>
            </div>
          )}

          <div className="mt-8 pt-6 border-t border-slate-100 dark:border-white/5 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 dark:bg-white/10 hover:bg-slate-200 dark:hover:bg-white/15 text-slate-800 dark:text-slate-200 rounded-xl text-xs font-semibold transition-colors"
            >
              <Home className="size-3.5" />
              <span>Retour à l’accueil</span>
            </Link>

            <Link
              to="/procedures"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-xl text-xs font-semibold transition-colors"
            >
              <span>Consulter les procédures</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </div>

        </div>
      </div>
    </main>
  )
}
