import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

const routeMetadata = {
  '/': {
    title: "Best Travel · Cabinet Conseil Immigration Canada, Auto-École & Langues à Douala",
    description: "Cabinet conseil à Douala (Makepe). Accompagnement expert pour immigration Canada : permis d'études, Entrée Express, permis de travail, auto-école certifiée et cours de langues.",
  },
  '/procedures': {
    title: "Procédures Canada · Permis d'Études, Travail & Entrée Express | Best Travel",
    description: "Instruisez votre dossier d'immigration pour le Canada avec rigueur : permis d'études, travailleurs qualifiés, mobilité francophone et visa visiteur.",
  },
  '/auto-ecole': {
    title: "Auto-École Certifiée à Douala Makepe · Formation Permis B | Best Travel",
    description: "Formation de conduite moderne à Douala avec moniteurs expérimentés, simulateurs et cours de code accélérés.",
  },
  '/langues': {
    title: "Centre de Langues & Préparation Tests TEF, TCF, IELTS à Douala | Best Travel",
    description: "Cours d'anglais et de français intensifs à Douala Makepe. Préparation ciblée aux certifications internationales requises pour le Canada.",
  },
  '/contact': {
    title: "Prendre Rendez-vous en Agence à Douala Makepe | Best Travel",
    description: "Contactez l'agence Best Travel à Makepe (station Gulfin). Évaluation gratuite de profil et prise de rendez-vous avec un conseiller.",
  },
}

export default function PageSEO() {
  const location = useLocation()

  useEffect(() => {
    const meta = routeMetadata[location.pathname] || routeMetadata['/']
    
    // Update document title
    document.title = meta.title

    // Update meta description
    const descEl = document.querySelector('meta[name="description"]')
    if (descEl) {
      descEl.setAttribute('content', meta.description)
    }

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) {
      ogTitle.setAttribute('content', meta.title)
    }

    const ogDesc = document.querySelector('meta[property="og:description"]')
    if (ogDesc) {
      ogDesc.setAttribute('content', meta.description)
    }

    // Scroll to top on route change
    window.scrollTo(0, 0)
  }, [location.pathname])

  return null
}
