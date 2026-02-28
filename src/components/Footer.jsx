import React from 'react'

export default function Footer() {
  return (
    <>
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
                <span className="material-symbols-outlined text-white text-2xl">map</span>
              </div>
              <span className="font-bold text-xl tracking-tight">Best Travel Service</span>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed">
              Cabinet leader de l'accompagnement en immigration canadienne au Cameroun. Votre réussite est notre priorité absolue depuis plus de 2023.
            </p>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-accent pl-3">Liens Utiles</h4>
            <ul className="space-y-4 text-slate-400">
              <li><a className="hover:text-white transition-colors" href="#">Notre Expertise</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Évaluation de Profil</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Programmes Provinciaux</a></li>
              <li><a className="hover:text-white transition-colors" href="#">Blog & Actualités</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-accent pl-3">Nous Contacter</h4>
            <ul className="space-y-4 text-slate-400">
              <li className="flex items-start space-x-3">
                <span className="material-icons text-accent text-xl">location_on</span>
                <span className="text-sm">Makepe, station Gulfin apres le carrefour conquête,Douala Cameroun</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons text-accent text-xl">phone</span>
                <span className="text-sm">+237 6XX XX XX XX</span>
              </li>
              <li className="flex items-center space-x-3">
                <span className="material-icons text-accent text-xl">email</span>
                <span className="text-sm">contact@canada-express.cm</span>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-lg font-bold border-l-4 border-accent pl-3">Suivez-nous</h4>
            <div className="flex space-x-4">
              <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors" href="#" aria-label="Facebook">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path></svg>
              </a>
              <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors" href="#" aria-label="Twitter">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.84 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"></path></svg>
              </a>
              <a className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-accent transition-colors" href="#" aria-label="Instagram">
                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069z"></path></svg>
              </a>
            </div>
            <p className="text-xs text-slate-500">Abonnez-vous pour recevoir les dernières mises à jour du gouvernement canadien.</p>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center px-6">
          <p className="text-slate-500 text-xs">© 2024 Cabinet Immigration Express. Tous droits réservés. Bureau de Douala & Yaoundé.</p>
        </div>
      </footer>

      <a
        className="fixed right-6 bottom-6 sm:bottom-10 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-2xl z-50 hover:scale-110 transition-transform"
        href="https://wa.me/237600000000"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp"
      >
        <svg className="w-8 h-8 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"></path>
        </svg>
      </a>
    </>
  )
}
