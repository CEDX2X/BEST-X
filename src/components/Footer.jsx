import React from 'react'
import { Link } from 'react-router-dom'
import { useTheme } from '../context/ThemeContext'
import { useSiteContent } from '../context/SiteContentContext'
import { MapPin, Phone, Mail, ArrowUpRight, MessageSquare } from 'lucide-react'

export default function Footer() {
  const { theme } = useTheme()
  const { content } = useSiteContent()

  const lightLogoUrl =
    content.images?.lightLogo ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2FIMG_5277.PNG?alt=media&token=d79056eb-f47f-4eb9-947b-eb27321b7a29'
  const darkLogoUrl =
    content.images?.darkLogo ||
    'https://firebasestorage.googleapis.com/v0/b/kylyoapp-8ec0b.firebasestorage.app/o/Ced%2Flogo%20best%20blanc.png?alt=media&token=934f2a51-11ed-473f-beb4-5a6b03cefe33'

  const logoUrl = theme === 'dark' ? darkLogoUrl : lightLogoUrl
  const general = content.general || {}
  const social = content.socialLinks || {}

  const whatsappLink = social.whatsapp || 'https://wa.me/237691001784'

  return (
    <>
      <footer className="bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 pt-16 pb-12 border-t border-slate-200/80 dark:border-white/10 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-slate-200/80 dark:border-white/10">
            
            {/* Column 1: Brand & Presentation (4 cols) */}
            <div className="md:col-span-4 space-y-4">
              <Link to="/" className="inline-flex items-center gap-3 group">
                <div className="h-10 sm:h-12 w-auto flex items-center justify-center">
                  <img
                    src={logoUrl}
                    alt={general.brandName || 'Best Travel'}
                    className="h-full w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <span className="font-display font-bold text-lg sm:text-xl text-slate-900 dark:text-white tracking-tight">
                  {general.brandName || 'Best Travel'}
                </span>
              </Link>

              <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-sm">
                Cabinet conseil spécialisé en mobilité internationale et immigration canadienne au Cameroun.
                Accompagnement rigoureux, déontologique et individualisé.
              </p>

              {/* Social Channels */}
              <div className="flex items-center gap-3 pt-1">
                {social.facebook && (
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook Best Travel"
                    className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-accent text-slate-700 dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                    </svg>
                  </a>
                )}
                {social.instagram && (
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram Best Travel"
                    className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-accent text-slate-700 dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </a>
                )}
                {social.linkedin && (
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Best Travel"
                    className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-accent text-slate-700 dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                    </svg>
                  </a>
                )}
                {social.youtube && (
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="YouTube Best Travel"
                    className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-800 hover:bg-accent text-slate-700 dark:text-slate-300 hover:text-white flex items-center justify-center transition-colors"
                  >
                    <svg className="size-4 fill-current" viewBox="0 0 24 24">
                      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                    </svg>
                  </a>
                )}
              </div>

              <div className="text-xs text-slate-500 dark:text-slate-500">
                Douala · Yaoundé · Partenaires agréés Canada & Europe
              </div>
            </div>

            {/* Column 2: Navigation Mirror (3 cols) */}
            <div className="md:col-span-3 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Filières & Programmes
              </div>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li>
                  <Link to="/procedures" className="hover:text-primary dark:hover:text-white transition-colors">
                    Permis d'Études Canada
                  </Link>
                </li>
                <li>
                  <Link to="/procedures" className="hover:text-primary dark:hover:text-white transition-colors">
                    Entrée Express & Travailleurs
                  </Link>
                </li>
                <li>
                  <Link to="/auto-ecole" className="hover:text-primary dark:hover:text-white transition-colors">
                    Auto-École (Normes Sécuritaires)
                  </Link>
                </li>
                <li>
                  <Link to="/langues" className="hover:text-primary dark:hover:text-white transition-colors">
                    Préparation TEF / TCF / IELTS
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Legal (5 cols) */}
            <div className="md:col-span-5 space-y-3">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white">
                Agence de Douala
              </div>
              <ul className="space-y-2.5 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2.5">
                  <MapPin className="size-4 text-accent shrink-0 mt-0.5" />
                  <span>{general.address || 'Makepe, station Gulfin après le carrefour conquête, Douala, Cameroun'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Phone className="size-4 text-accent shrink-0" />
                  <span className="font-mono text-xs sm:text-sm">{general.phone || '+237 691 00 17 84'}</span>
                </li>
                <li className="flex items-center gap-2.5">
                  <Mail className="size-4 text-accent shrink-0" />
                  <span className="font-mono text-xs sm:text-sm">{general.email || 'besttravservice@gmail.com'}</span>
                </li>
              </ul>

              <div className="pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  <span>Prendre un rendez-vous d'évaluation</span>
                  <ArrowUpRight className="size-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom Bar: Quiet Copyright */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-500">
            <div>
              © 2026 {general.brandName || 'Best Travel'}. Tous droits réservés.
            </div>
            <div className="flex items-center gap-6">
              <span>Conformité & Déontologie IRCC</span>
              <span>·</span>
              <a
                href="https://kylyo-services.web.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline font-medium text-slate-600 dark:text-slate-400"
              >
                Conçu avec rigueur
              </a>
            </div>
          </div>

        </div>
      </footer>

      {/* Floating WhatsApp Quick Action Button */}
      <a
        href={whatsappLink}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter Best Travel sur WhatsApp"
        className="fixed right-6 bottom-6 bg-[#25D366] hover:bg-[#20BD5A] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center shadow-xl hover:scale-105 active:scale-95 transition-all z-40"
      >
        <MessageSquare className="size-6 sm:size-7" />
      </a>
    </>
  )
}
