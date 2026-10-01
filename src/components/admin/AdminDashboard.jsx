import React, { useState } from 'react'
import {
  X,
  Save,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Edit2,
  FileText,
  Briefcase,
  Share2,
  Image,
  Inbox,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  ExternalLink,
  MessageSquare,
  Upload,
  RefreshCw,
  AlertTriangle,
  Lock,
  KeyRound,
  Shield,
  LogOut,
} from 'lucide-react'
import { useSiteContent } from '../../context/SiteContentContext'
import ConfirmModal from './ConfirmModal'

export default function AdminDashboard({ isOpen, onClose }) {
  const {
    content,
    saveContent,
    offers,
    addOffer,
    updateOffer,
    deleteOffer,
    toggleOfferActive,
    consultations,
    loadingConsultations,
    updateConsultationStatus,
    deleteConsultation,
    isSyncing,
    adminPassword,
    updateAdminPassword,
  } = useSiteContent()

  const [activeTab, setActiveTab] = useState('texts') // 'texts' | 'offers' | 'social' | 'images' | 'consultations' | 'security'
  const [selectedPageTab, setSelectedPageTab] = useState('home') // 'home' | 'procedures' | 'autoEcole' | 'langues' | 'contact' | 'agency'

  // Security password state
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })
  const [passwordError, setPasswordError] = useState('')

  // Local draft states for editing forms
  const [draftTexts, setDraftTexts] = useState(content.texts || {})
  const [draftGeneral, setDraftGeneral] = useState(content.general || {})
  const [draftSocial, setDraftSocial] = useState(content.socialLinks || {})
  const [draftImages, setDraftImages] = useState(content.images || {})

  // Pending action for confirmation modal
  const [confirmConfig, setConfirmConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    confirmText: 'Confirmer',
    isDestructive: false,
    action: null,
  })

  // State for creating/editing an offer
  const [editingOffer, setEditingOffer] = useState(null)
  const [isCreatingOffer, setIsCreatingOffer] = useState(false)
  const [newOfferData, setNewOfferData] = useState({
    serviceCategory: 'canada',
    title: '',
    badge: 'Programme Officiel',
    desc: '',
    price: 'Sur devis',
    timeline: '3 à 6 mois',
    image: content.images?.heroImage || '',
    highlights: '',
    active: true,
  })

  // Filter for consultations
  const [consultationFilter, setConsultationFilter] = useState('all')
  const [statusMessage, setStatusMessage] = useState('')

  if (!isOpen) return null

  const showConfirm = ({ title, message, confirmText, isDestructive, onConfirm }) => {
    setConfirmConfig({
      isOpen: true,
      title,
      message,
      confirmText: confirmText || 'Enregistrer les modifications',
      isDestructive: !!isDestructive,
      action: onConfirm,
    })
  }

  const handleConfirmClose = () => {
    setConfirmConfig((prev) => ({ ...prev, isOpen: false }))
  }

  const handleExecuteConfirmedAction = async () => {
    if (confirmConfig.action) {
      await confirmConfig.action()
      setStatusMessage('Modifications enregistrées avec succès en temps réel.')
      setTimeout(() => setStatusMessage(''), 4000)
    }
    handleConfirmClose()
  }

  // 1. SAVE TEXTS WITH CONFIRMATION
  const requestSaveTexts = () => {
    showConfirm({
      title: 'Enregistrer les textes du site',
      message: 'Ces modifications textuelles seront immédiatement visibles par les visiteurs en direct.',
      confirmText: 'Mettre à jour les textes',
      onConfirm: async () => {
        await saveContent({
          ...content,
          texts: draftTexts,
          general: draftGeneral,
        })
      },
    })
  }

  // 2. SAVE SOCIAL & CONTACT LINKS WITH CONFIRMATION
  const requestSaveSocial = () => {
    showConfirm({
      title: 'Enregistrer les liens et réseaux sociaux',
      message: 'Les numéros WhatsApp, redirections et canaux sociaux seront mis à jour en temps réel.',
      confirmText: 'Mettre à jour les liens',
      onConfirm: async () => {
        await saveContent({
          ...content,
          socialLinks: draftSocial,
          general: draftGeneral,
        })
      },
    })
  }

  // 3. SAVE IMAGES WITH CONFIRMATION
  const requestSaveImages = () => {
    showConfirm({
      title: 'Enregistrer les nouvelles images',
      message: 'Les visuels du site (bannières, couvertures de services) seront appliqués immédiatement.',
      confirmText: 'Appliquer les images',
      onConfirm: async () => {
        await saveContent({
          ...content,
          images: draftImages,
        })
      },
    })
  }

  // Handle local image file upload & convert to data URL
  const handleImageFileUpload = (key, file) => {
    if (!file) return
    const reader = new FileReader()
    reader.onload = (e) => {
      setDraftImages((prev) => ({
        ...prev,
        [key]: e.target.result,
      }))
    }
    reader.readAsDataURL(file)
  }

  // 4. OFFERS ACTIONS WITH CONFIRMATION
  const requestCreateOffer = (e) => {
    e.preventDefault()
    showConfirm({
      title: 'Créer une nouvelle offre de service',
      message: `L'offre "${newOfferData.title}" sera ajoutée au catalogue et affichée sur le site.`,
      confirmText: 'Créer et publier',
      onConfirm: async () => {
        const highlightsArray = typeof newOfferData.highlights === 'string'
          ? newOfferData.highlights.split('\n').filter((l) => l.trim().length > 0)
          : newOfferData.highlights

        await addOffer({
          ...newOfferData,
          highlights: highlightsArray,
        })
        setIsCreatingOffer(false)
        setNewOfferData({
          serviceCategory: 'canada',
          title: '',
          badge: 'Programme Officiel',
          desc: '',
          price: 'Sur devis',
          timeline: '3 à 6 mois',
          image: content.images?.heroImage || '',
          highlights: '',
          active: true,
        })
      },
    })
  }

  const requestUpdateOffer = (e) => {
    e.preventDefault()
    if (!editingOffer) return
    showConfirm({
      title: 'Modifier l\'offre de service',
      message: `Enregistrer les modifications apportées à l'offre "${editingOffer.title}" ?`,
      confirmText: 'Mettre à jour l\'offre',
      onConfirm: async () => {
        const highlightsArray = typeof editingOffer.highlights === 'string'
          ? editingOffer.highlights.split('\n').filter((l) => l.trim().length > 0)
          : editingOffer.highlights

        await updateOffer(editingOffer.id, {
          ...editingOffer,
          highlights: highlightsArray,
        })
        setEditingOffer(null)
      },
    })
  }

  const requestDeleteOffer = (offer) => {
    showConfirm({
      title: 'Supprimer cette offre',
      message: `Êtes-vous certain de vouloir supprimer définitivement l'offre "${offer.title}" du site ?`,
      confirmText: 'Supprimer définitivement',
      isDestructive: true,
      onConfirm: async () => {
        await deleteOffer(offer.id)
      },
    })
  }

  const requestToggleOffer = (offer) => {
    const nextState = !offer.active
    showConfirm({
      title: nextState ? 'Afficher l\'offre sur le site' : 'Masquer l\'offre du site',
      message: nextState
        ? `L'offre "${offer.title}" redeviendra visible pour tous les visiteurs.`
        : `L'offre "${offer.title}" sera temporairement masquée du site public.`,
      confirmText: nextState ? 'Rendre visible' : 'Masquer l\'offre',
      onConfirm: async () => {
        await toggleOfferActive(offer.id)
      },
    })
  }

  // 5. CONSULTATIONS ACTIONS
  const requestUpdateConsultation = (id, newStatus, candidateName) => {
    showConfirm({
      title: 'Mettre à jour le statut du dossier',
      message: `Modifier le statut de la demande de ${candidateName} à "${newStatus}" ?`,
      confirmText: 'Mettre à jour le statut',
      onConfirm: async () => {
        await updateConsultationStatus(id, newStatus)
      },
    })
  }

  const requestDeleteConsultation = (id, candidateName) => {
    showConfirm({
      title: 'Supprimer la demande de devis',
      message: `Voulez-vous supprimer définitivement la fiche de consultation de ${candidateName} ?`,
      confirmText: 'Supprimer le dossier',
      isDestructive: true,
      onConfirm: async () => {
        await deleteConsultation(id)
      },
    })
  }

  // 6. CHANGE PASSWORD ACTION
  const requestChangePassword = (e) => {
    e.preventDefault()
    setPasswordError('')
    const expected = adminPassword || 'Henribest123'
    if (passwordForm.currentPassword !== expected) {
      setPasswordError("L'ancien mot de passe saisi est incorrect.")
      return
    }
    if (!passwordForm.newPassword || passwordForm.newPassword.length < 6) {
      setPasswordError('Le nouveau mot de passe doit comporter au moins 6 caractères.')
      return
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordError('La confirmation ne correspond pas au nouveau mot de passe.')
      return
    }

    showConfirm({
      title: 'Modifier le mot de passe administrateur',
      message:
        'Êtes-vous certain de vouloir modifier le mot de passe d\'accès administrateur ? Le nouveau mot de passe sera immédiatement requis lors des prochaines connexions.',
      confirmText: 'Changer le mot de passe',
      onConfirm: async () => {
        await updateAdminPassword(passwordForm.newPassword)
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
      },
    })
  }

  // Filtered consultations list
  const filteredConsultations = consultationFilter === 'all'
    ? consultations
    : consultations.filter((c) => c.status === consultationFilter)

  // Immediate logout & wipe session
  const handleLogout = () => {
    try {
      sessionStorage.removeItem('best_admin_authenticated')
    } catch {}
    onClose()
  }

  return (
    <div className="fixed inset-0 z-[90] bg-[#070D1E] text-slate-100 flex flex-col overflow-hidden font-sans">
      
      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={confirmConfig.isOpen}
        title={confirmConfig.title}
        message={confirmConfig.message}
        confirmText={confirmConfig.confirmText}
        isDestructive={confirmConfig.isDestructive}
        onConfirm={handleExecuteConfirmedAction}
        onCancel={handleConfirmClose}
      />

      {/* Top Bar Navigation */}
      <header className="h-16 px-6 bg-[#0B132B] border-b border-slate-800 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-accent text-white flex items-center justify-center font-bold text-sm">
            BT
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-white text-base tracking-tight">
                Console d'Administration
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-semibold border border-emerald-500/30">
                Temps Réel Actif
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Best Travel · Direction & Gestion Commerciale
            </p>
          </div>
        </div>

        {/* Global Action / Status feedback */}
        <div className="flex items-center gap-3">
          {statusMessage && (
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20 animate-in fade-in">
              <CheckCircle2 className="size-4" />
              <span>{statusMessage}</span>
            </div>
          )}
          {isSyncing && (
            <div className="flex items-center gap-1.5 text-xs text-amber-400">
              <RefreshCw className="size-3.5 animate-spin" />
              <span>Synchronisation Firestore...</span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-rose-500/15 hover:bg-rose-500/25 text-rose-400 hover:text-rose-300 rounded-lg text-xs font-semibold transition-colors border border-rose-500/30 shadow-sm"
            title="Déconnecter et reverrouiller l'administration"
          >
            <LogOut className="size-3.5" />
            <span>Se déconnecter</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg text-xs font-semibold transition-colors border border-slate-700"
            title="Fermer et reverrouiller la session"
          >
            <X className="size-4" />
            <span>Fermer</span>
          </button>
        </div>
      </header>

      {/* Subnav Tabs */}
      <div className="bg-[#0B132B]/60 border-b border-slate-800/80 px-6 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
        <button
          onClick={() => setActiveTab('texts')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'texts'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <FileText className="size-4" />
          <span>1. Textes du site</span>
        </button>

        <button
          onClick={() => setActiveTab('offers')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'offers'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Briefcase className="size-4" />
          <span>2. Gestion des Offres</span>
          <span className="text-[10px] bg-black/30 px-1.5 py-0.5 rounded-full">
            {offers.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('social')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'social'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Share2 className="size-4" />
          <span>3. Réseaux & Redirections</span>
        </button>

        <button
          onClick={() => setActiveTab('images')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'images'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Image className="size-4" />
          <span>4. Images du site</span>
        </button>

        <button
          onClick={() => setActiveTab('consultations')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'consultations'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Inbox className="size-4" />
          <span>5. Demandes de devis</span>
          <span className="text-[10px] bg-red-600 text-white px-1.5 py-0.5 rounded-full font-bold">
            {consultations.length}
          </span>
        </button>

        <button
          onClick={() => setActiveTab('security')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
            activeTab === 'security'
              ? 'bg-accent text-white shadow-md'
              : 'text-slate-400 hover:text-white hover:bg-white/5'
          }`}
        >
          <Lock className="size-4" />
          <span>6. Sécurité & Mot de Passe</span>
        </button>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto p-6 max-w-7xl mx-auto w-full">

        {/* ---------------- 1. TEXTS TAB ---------------- */}
        {activeTab === 'texts' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Modification des Textes par Page et par Blocs
                </h2>
                <p className="text-xs text-slate-400">
                  Sélectionnez une page pour modifier les titres, sous-titres et paragraphes.
                </p>
              </div>
              <button
                onClick={requestSaveTexts}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
              >
                <Save className="size-4" />
                <span>Enregistrer les textes</span>
              </button>
            </div>

            {/* Page Selector Tabs */}
            <div className="flex flex-wrap gap-2">
              {[
                { id: 'home', label: 'Accueil' },
                { id: 'procedures', label: 'Procédures Canada' },
                { id: 'autoEcole', label: 'Auto-École' },
                { id: 'langues', label: 'Cours de Langues' },
                { id: 'contact', label: 'Page Contact' },
                { id: 'agency', label: 'Coordonnées & Horaires' },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedPageTab(tab.id)}
                  className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-colors ${
                    selectedPageTab === tab.id
                      ? 'bg-slate-800 text-white font-semibold border border-slate-700'
                      : 'text-slate-400 hover:text-white bg-slate-900/60'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Form Fields by Page */}
            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 space-y-6">
              {selectedPageTab === 'home' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Surtitre (Kicker) du Hero
                    </label>
                    <input
                      type="text"
                      value={draftTexts.home?.heroKicker || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          home: { ...draftTexts.home, heroKicker: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Titre Principal Hero (H1)
                    </label>
                    <textarea
                      rows={2}
                      value={draftTexts.home?.heroTitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          home: { ...draftTexts.home, heroTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description & Proposition de Valeur
                    </label>
                    <textarea
                      rows={3}
                      value={draftTexts.home?.heroSubtitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          home: { ...draftTexts.home, heroSubtitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-5">
                    <h3 className="text-sm font-semibold text-white">Bloc d'Appel en Agence (Bas de page)</h3>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Titre du bloc de consultation
                      </label>
                      <input
                        type="text"
                        value={draftTexts.home?.calloutTitle || ''}
                        onChange={(e) =>
                          setDraftTexts({
                            ...draftTexts,
                            home: { ...draftTexts.home, calloutTitle: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Description de prise de rendez-vous
                      </label>
                      <textarea
                        rows={2}
                        value={draftTexts.home?.calloutDesc || ''}
                        onChange={(e) =>
                          setDraftTexts({
                            ...draftTexts,
                            home: { ...draftTexts.home, calloutDesc: e.target.value },
                          })
                        }
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>
                </div>
              )}

              {selectedPageTab === 'procedures' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Surtitre En-tête Procédures
                    </label>
                    <input
                      type="text"
                      value={draftTexts.procedures?.headerKicker || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          procedures: { ...draftTexts.procedures, headerKicker: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Titre de la Page Procédures
                    </label>
                    <input
                      type="text"
                      value={draftTexts.procedures?.headerTitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          procedures: { ...draftTexts.procedures, headerTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description d'accompagnement
                    </label>
                    <textarea
                      rows={3}
                      value={draftTexts.procedures?.headerDesc || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          procedures: { ...draftTexts.procedures, headerDesc: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {selectedPageTab === 'autoEcole' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Surtitre Auto-École
                    </label>
                    <input
                      type="text"
                      value={draftTexts.autoEcole?.headerKicker || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          autoEcole: { ...draftTexts.autoEcole, headerKicker: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Titre Page Auto-École
                    </label>
                    <input
                      type="text"
                      value={draftTexts.autoEcole?.headerTitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          autoEcole: { ...draftTexts.autoEcole, headerTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description de la formation conducteur
                    </label>
                    <textarea
                      rows={3}
                      value={draftTexts.autoEcole?.headerDesc || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          autoEcole: { ...draftTexts.autoEcole, headerDesc: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {selectedPageTab === 'langues' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Surtitre Cours de Langue
                    </label>
                    <input
                      type="text"
                      value={draftTexts.langues?.headerKicker || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          langues: { ...draftTexts.langues, headerKicker: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Titre Page Langues
                    </label>
                    <input
                      type="text"
                      value={draftTexts.langues?.headerTitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          langues: { ...draftTexts.langues, headerTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description Préparation TEF / IELTS
                    </label>
                    <textarea
                      rows={3}
                      value={draftTexts.langues?.headerDesc || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          langues: { ...draftTexts.langues, headerDesc: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {selectedPageTab === 'contact' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Surtitre Page Contact
                    </label>
                    <input
                      type="text"
                      value={draftTexts.contact?.headerKicker || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          contact: { ...draftTexts.contact, headerKicker: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Titre Page Contact
                    </label>
                    <input
                      type="text"
                      value={draftTexts.contact?.headerTitle || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          contact: { ...draftTexts.contact, headerTitle: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Description Formulaire
                    </label>
                    <textarea
                      rows={3}
                      value={draftTexts.contact?.headerDesc || ''}
                      onChange={(e) =>
                        setDraftTexts({
                          ...draftTexts,
                          contact: { ...draftTexts.contact, headerDesc: e.target.value },
                        })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}

              {selectedPageTab === 'agency' && (
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Nom de la structure
                    </label>
                    <input
                      type="text"
                      value={draftGeneral.brandName || ''}
                      onChange={(e) =>
                        setDraftGeneral({ ...draftGeneral, brandName: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Adresse Physique (Makepe, Douala)
                    </label>
                    <input
                      type="text"
                      value={draftGeneral.address || ''}
                      onChange={(e) =>
                        setDraftGeneral({ ...draftGeneral, address: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Téléphone affiché
                      </label>
                      <input
                        type="text"
                        value={draftGeneral.phone || ''}
                        onChange={(e) =>
                          setDraftGeneral({ ...draftGeneral, phone: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Email de correspondance
                      </label>
                      <input
                        type="email"
                        value={draftGeneral.email || ''}
                        onChange={(e) =>
                          setDraftGeneral({ ...draftGeneral, email: e.target.value })
                        }
                        className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                      Horaires d'ouverture
                    </label>
                    <input
                      type="text"
                      value={draftGeneral.openingHours || ''}
                      onChange={(e) =>
                        setDraftGeneral({ ...draftGeneral, openingHours: e.target.value })
                      }
                      className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* ---------------- 2. OFFERS TAB ---------------- */}
        {activeTab === 'offers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Gestion des Offres et Services
                </h2>
                <p className="text-xs text-slate-400">
                  Créez, modifiez, masquez ou retirez les offres d'immigration, auto-école et langues.
                </p>
              </div>
              <button
                onClick={() => setIsCreatingOffer(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
              >
                <Plus className="size-4" />
                <span>Créer une nouvelle offre</span>
              </button>
            </div>

            {/* List of Existing Offers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {offers.map((offer) => (
                <div
                  key={offer.id}
                  className={`bg-[#0B132B] border rounded-2xl overflow-hidden flex flex-col transition-all ${
                    offer.active
                      ? 'border-slate-800'
                      : 'border-slate-800/50 opacity-60 bg-slate-950/40'
                  }`}
                >
                  <div className="relative h-40 w-full overflow-hidden bg-slate-900">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 bg-slate-900/80 backdrop-blur-md rounded text-white border border-white/10">
                        {offer.badge}
                      </span>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-accent/80 text-white uppercase">
                        {offer.serviceCategory}
                      </span>
                    </div>

                    <div className="absolute top-3 right-3">
                      <button
                        onClick={() => requestToggleOffer(offer)}
                        className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          offer.active
                            ? 'bg-emerald-500/80 hover:bg-emerald-600 text-white'
                            : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                        }`}
                        title={offer.active ? 'Cliquer pour masquer du site' : 'Cliquer pour afficher sur le site'}
                      >
                        {offer.active ? <Eye className="size-4" /> : <EyeOff className="size-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs text-slate-400">
                        <span>{offer.timeline}</span>
                        <span className="font-semibold text-slate-200">{offer.price}</span>
                      </div>
                      <h3 className="font-display font-bold text-base text-white">
                        {offer.title}
                      </h3>
                      <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                        {offer.desc}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                      <button
                        onClick={() => setEditingOffer(offer)}
                        className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1.5 p-1.5"
                      >
                        <Edit2 className="size-3.5" />
                        <span>Modifier</span>
                      </button>

                      <button
                        onClick={() => requestDeleteOffer(offer)}
                        className="text-xs font-semibold text-rose-400 hover:text-rose-300 flex items-center gap-1.5 p-1.5"
                      >
                        <Trash2 className="size-3.5" />
                        <span>Supprimer</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Modal: Create Offer */}
            {isCreatingOffer && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                <div className="bg-[#0B132B] border border-slate-700 rounded-2xl w-full max-w-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display text-lg font-bold text-white">
                      Créer une nouvelle Offre
                    </h3>
                    <button
                      onClick={() => setIsCreatingOffer(false)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <form onSubmit={requestCreateOffer} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Catégorie de Service
                        </label>
                        <select
                          value={newOfferData.serviceCategory}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, serviceCategory: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        >
                          <option value="canada">Immigration Canada</option>
                          <option value="auto-ecole">Auto-École</option>
                          <option value="langues">Cours de Langues</option>
                          <option value="europe">Europe & Autres</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Badge / Tag
                        </label>
                        <input
                          type="text"
                          value={newOfferData.badge}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, badge: e.target.value })
                          }
                          placeholder="Ex: Études, Permis B, TEF"
                          required
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        Intitulé de l'Offre
                      </label>
                      <input
                        type="text"
                        value={newOfferData.title}
                        onChange={(e) =>
                          setNewOfferData({ ...newOfferData, title: e.target.value })
                        }
                        placeholder="Ex: Permis d'Études Canada & Bourse"
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        Description Détaillée
                      </label>
                      <textarea
                        rows={3}
                        value={newOfferData.desc}
                        onChange={(e) =>
                          setNewOfferData({ ...newOfferData, desc: e.target.value })
                        }
                        placeholder="Détails de la procédure et étapes incluses..."
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Tarification indicative
                        </label>
                        <input
                          type="text"
                          value={newOfferData.price}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, price: e.target.value })
                          }
                          placeholder="Ex: Sur devis personnalisé"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Délai moyen d'instruction
                        </label>
                        <input
                          type="text"
                          value={newOfferData.timeline}
                          onChange={(e) =>
                            setNewOfferData({ ...newOfferData, timeline: e.target.value })
                          }
                          placeholder="Ex: 3 à 6 mois"
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        URL de l'image de couverture
                      </label>
                      <input
                        type="url"
                        value={newOfferData.image}
                        onChange={(e) =>
                          setNewOfferData({ ...newOfferData, image: e.target.value })
                        }
                        placeholder="https://..."
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        Points forts (1 par ligne)
                      </label>
                      <textarea
                        rows={3}
                        value={newOfferData.highlights}
                        onChange={(e) =>
                          setNewOfferData({ ...newOfferData, highlights: e.target.value })
                        }
                        placeholder="Admission universitaire garantie&#10;Montage de garant financier&#10;Suivi biométrique"
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setIsCreatingOffer(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md"
                      >
                        Confirmer la création
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* Modal: Edit Offer */}
            {editingOffer && (
              <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
                <div className="bg-[#0B132B] border border-slate-700 rounded-2xl w-full max-w-xl p-6 space-y-5 max-h-[90vh] overflow-y-auto">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                    <h3 className="font-display text-lg font-bold text-white">
                      Modifier l'Offre : {editingOffer.title}
                    </h3>
                    <button
                      onClick={() => setEditingOffer(null)}
                      className="text-slate-400 hover:text-white"
                    >
                      <X className="size-5" />
                    </button>
                  </div>

                  <form onSubmit={requestUpdateOffer} className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Catégorie de Service
                        </label>
                        <select
                          value={editingOffer.serviceCategory}
                          onChange={(e) =>
                            setEditingOffer({ ...editingOffer, serviceCategory: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        >
                          <option value="canada">Immigration Canada</option>
                          <option value="auto-ecole">Auto-École</option>
                          <option value="langues">Cours de Langues</option>
                          <option value="europe">Europe & Autres</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Badge / Tag
                        </label>
                        <input
                          type="text"
                          value={editingOffer.badge}
                          onChange={(e) =>
                            setEditingOffer({ ...editingOffer, badge: e.target.value })
                          }
                          required
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        Intitulé de l'Offre
                      </label>
                      <input
                        type="text"
                        value={editingOffer.title}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, title: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        Description Détaillée
                      </label>
                      <textarea
                        rows={3}
                        value={editingOffer.desc}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, desc: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Tarification indicative
                        </label>
                        <input
                          type="text"
                          value={editingOffer.price}
                          onChange={(e) =>
                            setEditingOffer({ ...editingOffer, price: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase text-slate-400">
                          Délai moyen d'instruction
                        </label>
                        <input
                          type="text"
                          value={editingOffer.timeline}
                          onChange={(e) =>
                            setEditingOffer({ ...editingOffer, timeline: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold uppercase text-slate-400">
                        URL de l'image de couverture
                      </label>
                      <input
                        type="url"
                        value={editingOffer.image}
                        onChange={(e) =>
                          setEditingOffer({ ...editingOffer, image: e.target.value })
                        }
                        required
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                      />
                    </div>

                    <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                      <button
                        type="button"
                        onClick={() => setEditingOffer(null)}
                        className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white"
                      >
                        Annuler
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md"
                      >
                        Mettre à jour l'offre
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ---------------- 3. SOCIAL & REDIRECTIONS TAB ---------------- */}
        {activeTab === 'social' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Gestion des Liens & Réseaux Sociaux
                </h2>
                <p className="text-xs text-slate-400">
                  Définissez l'ensemble des cibles de redirection pour chaque icône ou bouton cliquable.
                </p>
              </div>
              <button
                onClick={requestSaveSocial}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
              >
                <Save className="size-4" />
                <span>Enregistrer les liens</span>
              </button>
            </div>

            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 space-y-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#25D366]"></span>
                  <span>Lien Direct WhatsApp (Format https://wa.me/237XXXXXXXX)</span>
                </label>
                <input
                  type="text"
                  value={draftSocial.whatsapp || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, whatsapp: e.target.value })
                  }
                  placeholder="https://wa.me/237691001784"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Page Facebook
                </label>
                <input
                  type="text"
                  value={draftSocial.facebook || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, facebook: e.target.value })
                  }
                  placeholder="https://facebook.com/besttravelcm"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Compte Instagram
                </label>
                <input
                  type="text"
                  value={draftSocial.instagram || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, instagram: e.target.value })
                  }
                  placeholder="https://instagram.com/besttravel_cm"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Compte TikTok
                </label>
                <input
                  type="text"
                  value={draftSocial.tiktok || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, tiktok: e.target.value })
                  }
                  placeholder="https://tiktok.com/@besttravelcm"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Page LinkedIn
                </label>
                <input
                  type="text"
                  value={draftSocial.linkedin || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, linkedin: e.target.value })
                  }
                  placeholder="https://linkedin.com/company/best-travel-cm"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Chaîne YouTube
                </label>
                <input
                  type="text"
                  value={draftSocial.youtube || ''}
                  onChange={(e) =>
                    setDraftSocial({ ...draftSocial, youtube: e.target.value })
                  }
                  placeholder="https://youtube.com/@besttravelcm"
                  className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                />
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 4. IMAGES TAB ---------------- */}
        {activeTab === 'images' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Gestion des Images & Logo de l'En-tête
                </h2>
                <p className="text-xs text-slate-400">
                  Modifiez les logos clair et sombre, ajustez précisément leur taille sur le header et changez les visuels du site.
                </p>
              </div>
              <button
                onClick={requestSaveImages}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md transition-all self-start sm:self-auto"
              >
                <Save className="size-4" />
                <span>Appliquer les images & la taille</span>
              </button>
            </div>

            {/* Specialized Header Logo & Size Control Section */}
            <div className="bg-[#0B132B] border-2 border-accent/40 rounded-2xl p-6 space-y-6 shadow-xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-base text-white">
                      Configuration du Logo de l'En-tête (Header)
                    </span>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-accent/20 text-accent border border-accent/30">
                      Hauteur Dynamique
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Ajustez la hauteur en pixels pour adapter le logo à l'en-tête du site en direct.
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs">
                  <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
                    Bureau : <strong className="text-white font-mono">{draftImages.logoHeight || 50}px</strong>
                  </div>
                  <div className="bg-slate-900 px-3 py-1.5 rounded-xl border border-slate-700 text-slate-300">
                    Mobile : <strong className="text-white font-mono">{draftImages.logoHeightMobile || 38}px</strong>
                  </div>
                </div>
              </div>

              {/* Sliders for Logo Height */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-slate-900/60 p-5 rounded-xl border border-slate-800">
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-300">
                      Hauteur du Logo sur Grand Écran (Desktop) :
                    </label>
                    <span className="px-2 py-0.5 bg-accent/20 text-accent font-mono font-bold rounded">
                      {draftImages.logoHeight || 50} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="30"
                    max="80"
                    step="1"
                    value={draftImages.logoHeight || 50}
                    onChange={(e) =>
                      setDraftImages({
                        ...draftImages,
                        logoHeight: Number(e.target.value),
                      })
                    }
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>30 px (Compact)</span>
                    <span>50 px (Recommandé)</span>
                    <span>80 px (Grand)</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <label className="font-semibold text-slate-300">
                      Hauteur du Logo sur Mobile / Tablettes :
                    </label>
                    <span className="px-2 py-0.5 bg-accent/20 text-accent font-mono font-bold rounded">
                      {draftImages.logoHeightMobile || 38} px
                    </span>
                  </div>
                  <input
                    type="range"
                    min="24"
                    max="60"
                    step="1"
                    value={draftImages.logoHeightMobile || 38}
                    onChange={(e) =>
                      setDraftImages({
                        ...draftImages,
                        logoHeightMobile: Number(e.target.value),
                      })
                    }
                    className="w-full accent-accent cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>24 px (Étroit)</span>
                    <span>38 px (Recommandé)</span>
                    <span>60 px (Large)</span>
                  </div>
                </div>
              </div>

              {/* Real-time Header Simulation Preview Box */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Prévisualisation en direct de l'En-tête :
                </span>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Light Theme Simulation */}
                  <div className="p-4 bg-white rounded-xl border border-slate-300 space-y-2">
                    <div className="text-[11px] font-bold text-slate-700 uppercase tracking-wider flex items-center justify-between">
                      <span>Aperçu Thème Clair</span>
                      <span className="text-[10px] text-slate-500 font-normal">Hauteur : {draftImages.logoHeight || 50}px</span>
                    </div>
                    <div className="h-20 bg-slate-50 border border-slate-200 rounded-lg flex items-center px-4 overflow-hidden">
                      <img
                        src={draftImages.lightLogo || content.images?.lightLogo}
                        alt="Logo Preview Light"
                        style={{ height: `${draftImages.logoHeight || 50}px` }}
                        className="w-auto object-contain"
                      />
                    </div>
                  </div>

                  {/* Dark Theme Simulation */}
                  <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider flex items-center justify-between">
                      <span>Aperçu Thème Sombre</span>
                      <span className="text-[10px] text-slate-400 font-normal">Hauteur : {draftImages.logoHeight || 50}px</span>
                    </div>
                    <div className="h-20 bg-slate-900 border border-slate-800 rounded-lg flex items-center px-4 overflow-hidden">
                      <img
                        src={draftImages.darkLogo || content.images?.darkLogo}
                        alt="Logo Preview Dark"
                        style={{ height: `${draftImages.logoHeight || 50}px` }}
                        className="w-auto object-contain"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Logo Files URL & Upload for Light / Dark */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    1. Fichier Logo Officiel (Thème Clair)
                  </span>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">URL directe de l'image :</label>
                    <input
                      type="url"
                      value={draftImages.lightLogo || ''}
                      onChange={(e) =>
                        setDraftImages({ ...draftImages, lightLogo: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors border border-slate-700">
                    <Upload className="size-3.5" />
                    <span>Téléverser depuis l'ordinateur</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload('lightLogo', e.target.files?.[0])}
                      className="hidden"
                    />
                  </label>
                </div>

                <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
                  <span className="text-xs font-bold text-white uppercase tracking-wider block">
                    2. Fichier Logo Officiel (Thème Sombre)
                  </span>
                  <div className="space-y-1">
                    <label className="text-[11px] text-slate-400">URL directe de l'image :</label>
                    <input
                      type="url"
                      value={draftImages.darkLogo || ''}
                      onChange={(e) =>
                        setDraftImages({ ...draftImages, darkLogo: e.target.value })
                      }
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                    />
                  </div>
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors border border-slate-700">
                    <Upload className="size-3.5" />
                    <span>Téléverser depuis l'ordinateur</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageFileUpload('darkLogo', e.target.files?.[0])}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>
            </div>

            {/* Other Site Images */}
            <div className="space-y-4 pt-2">
              <h3 className="font-display font-bold text-base text-white">
                Autres Visuels et Couvertures du Site
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { key: 'heroImage', label: 'Bannière Principale Accueil' },
                  { key: 'autoEcoleImage', label: 'Visuel Auto-École' },
                  { key: 'languesImage', label: 'Visuel Centre de Langues' },
                  { key: 'contactImage', label: 'Visuel Page Contact' },
                ].map(({ key, label }) => (
                  <div
                    key={key}
                    className="bg-[#0B132B] border border-slate-800 rounded-2xl p-5 space-y-4"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-white uppercase tracking-wider">
                        {label}
                      </span>
                    </div>

                    <div className="relative h-44 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 flex items-center justify-center p-2">
                      {draftImages[key] ? (
                        <img
                          src={draftImages[key]}
                          alt={label}
                          className="max-h-full max-w-full object-contain"
                        />
                      ) : (
                        <span className="text-xs text-slate-500">Aucune image sélectionnée</span>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="space-y-1">
                        <label className="text-[11px] text-slate-400">URL directe de l'image :</label>
                        <input
                          type="url"
                          value={draftImages[key] || ''}
                          onChange={(e) =>
                            setDraftImages({ ...draftImages, [key]: e.target.value })
                          }
                          className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white text-xs focus:outline-none focus:border-accent"
                        />
                      </div>

                      <div className="flex items-center justify-between pt-1">
                        <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition-colors border border-slate-700">
                          <Upload className="size-3.5" />
                          <span>Téléverser depuis l'ordinateur</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleImageFileUpload(key, e.target.files?.[0])}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ---------------- 5. CONSULTATIONS & DEVIS TAB ---------------- */}
        {activeTab === 'consultations' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
              <div>
                <h2 className="font-display text-xl font-bold text-white tracking-tight">
                  Demandes de Devis & Consultations Reçues
                </h2>
                <p className="text-xs text-slate-400">
                  {consultations.length} candidat(s) ont soumis une demande d'évaluation en direct.
                </p>
              </div>

              {/* Status Filters */}
              <div className="flex items-center gap-1.5 bg-slate-900 p-1 rounded-xl border border-slate-800 self-start sm:self-auto">
                {[
                  { id: 'all', label: 'Toutes' },
                  { id: 'pending', label: 'En attente' },
                  { id: 'in_review', label: 'En analyse' },
                  { id: 'contacted', label: 'Contacté' },
                  { id: 'completed', label: 'Traité' },
                ].map((f) => (
                  <button
                    key={f.id}
                    onClick={() => setConsultationFilter(f.id)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                      consultationFilter === f.id
                        ? 'bg-accent text-white font-semibold shadow-sm'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {loadingConsultations ? (
              <div className="p-12 text-center text-slate-400 flex items-center justify-center gap-2">
                <RefreshCw className="size-5 animate-spin text-accent" />
                <span>Chargement des demandes en temps réel...</span>
              </div>
            ) : filteredConsultations.length === 0 ? (
              <div className="p-16 text-center bg-[#0B132B] border border-slate-800 rounded-2xl space-y-2">
                <Inbox className="size-8 mx-auto text-slate-500" />
                <h3 className="font-semibold text-white">Aucune demande trouvée</h3>
                <p className="text-xs text-slate-400 max-w-sm mx-auto">
                  Aucun dossier ne correspond au filtre sélectionné pour le moment.
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredConsultations.map((item) => {
                  const whatsappMsg = `Bonjour ${item.fullName || 'Madame/Monsieur'}, suite à votre demande sur Best Travel concernant : ${item.service || 'votre projet de mobilité'}, nous revenons vers vous pour convenir d'un rendez-vous.`
                  const cleanPhone = (item.phone || '').replace(/[^0-9]/g, '')
                  const waUrl = `https://wa.me/${cleanPhone}?text=${encodeURIComponent(whatsappMsg)}`

                  const statusBadges = {
                    pending: { label: 'En attente', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
                    in_review: { label: 'En analyse', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
                    contacted: { label: 'Contacté', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
                    completed: { label: 'Dossier Traité', color: 'bg-slate-700/50 text-slate-300 border-slate-600' },
                  }

                  const badge = statusBadges[item.status] || statusBadges.pending

                  return (
                    <div
                      key={item.id}
                      className="bg-[#0B132B] border border-slate-800 hover:border-slate-700 rounded-2xl p-5 space-y-4 transition-all"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-display font-bold text-base text-white">
                              {item.fullName || 'Anonyme'}
                            </span>
                            <span className={`text-[10px] font-semibold uppercase px-2 py-0.5 rounded border ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                          <div className="text-xs text-slate-400 flex items-center gap-3">
                            <span className="text-accent font-semibold">{item.service}</span>
                            <span>·</span>
                            <span>{item.createdAt ? new Date(item.createdAt).toLocaleString('fr-FR') : 'Date inconnue'}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          {/* Quick WhatsApp Action */}
                          {cleanPhone && (
                            <a
                              href={waUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-lg text-xs font-semibold shadow-sm transition-all"
                            >
                              <MessageSquare className="size-3.5" />
                              <span>Répondre sur WhatsApp</span>
                            </a>
                          )}

                          <button
                            onClick={() => requestDeleteConsultation(item.id, item.fullName)}
                            className="p-2 text-slate-500 hover:text-rose-400 rounded-lg transition-colors"
                            title="Supprimer ce dossier"
                          >
                            <Trash2 className="size-4" />
                          </button>
                        </div>
                      </div>

                      {/* Dossier Contact details */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-xs">
                        <div className="flex items-center gap-2 text-slate-300">
                          <Phone className="size-3.5 text-accent shrink-0" />
                          <span>{item.phone || 'Non renseigné'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <Mail className="size-3.5 text-accent shrink-0" />
                          <span className="truncate">{item.email || 'Non renseigné'}</span>
                        </div>
                        <div className="flex items-center gap-2 text-slate-300">
                          <span className="text-slate-500">Source :</span>
                          <span>{item.source || 'Site Web'}</span>
                        </div>
                      </div>

                      {/* Applicant Message */}
                      {item.message && (
                        <div className="bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
                          <span className="font-semibold text-slate-400 block mb-0.5">Message du candidat :</span>
                          {item.message}
                        </div>
                      )}

                      {/* Change Status Buttons */}
                      <div className="pt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2 text-xs">
                          <span className="text-slate-400">Modifier le statut :</span>
                          {['pending', 'in_review', 'contacted', 'completed'].map((st) => (
                            <button
                              key={st}
                              disabled={item.status === st}
                              onClick={() => requestUpdateConsultation(item.id, st, item.fullName)}
                              className={`px-2.5 py-1 rounded text-[11px] font-semibold transition-all ${
                                item.status === st
                                  ? 'bg-slate-700 text-white font-bold opacity-50 cursor-not-allowed'
                                  : 'bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700'
                              }`}
                            >
                              {statusBadges[st]?.label}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        )}

        {/* ---------------- 6. SECURITY & PASSWORD TAB ---------------- */}
        {activeTab === 'security' && (
          <div className="space-y-6 max-w-xl">
            <div className="pb-2 border-b border-slate-800 space-y-1">
              <h2 className="font-display text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Shield className="size-5 text-accent" />
                <span>Sécurité & Modification du Mot de Passe</span>
              </h2>
              <p className="text-xs text-slate-400">
                Gérez la clé d'accès sécurisée à la console d'administration Best Travel.
              </p>
            </div>

            <div className="bg-[#0B132B] border border-slate-800 rounded-2xl p-6 space-y-6">
              <form onSubmit={requestChangePassword} className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Ancien mot de passe actuel
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passwordForm.currentPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, currentPassword: e.target.value })
                        if (passwordError) setPasswordError('')
                      }}
                      placeholder="Saisissez le mot de passe en vigueur"
                      required
                      className="w-full px-4 py-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                    <KeyRound className="absolute left-3.5 top-3 size-4 text-slate-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passwordForm.newPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, newPassword: e.target.value })
                        if (passwordError) setPasswordError('')
                      }}
                      placeholder="Minimum 6 caractères"
                      required
                      className="w-full px-4 py-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                    <Lock className="absolute left-3.5 top-3 size-4 text-slate-500" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Confirmer le nouveau mot de passe
                  </label>
                  <div className="relative">
                    <input
                      type="password"
                      value={passwordForm.confirmPassword}
                      onChange={(e) => {
                        setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })
                        if (passwordError) setPasswordError('')
                      }}
                      placeholder="Répétez le nouveau mot de passe"
                      required
                      className="w-full px-4 py-2.5 pl-10 bg-slate-900 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-accent"
                    />
                    <Lock className="absolute left-3.5 top-3 size-4 text-slate-500" />
                  </div>
                </div>

                {passwordError && (
                  <div className="flex items-center gap-2 p-3 rounded-xl bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs">
                    <AlertTriangle className="size-4 shrink-0" />
                    <span>{passwordError}</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-800">
                  <button
                    type="submit"
                    className="w-full py-3 px-5 bg-accent hover:bg-accent-hover text-white rounded-xl text-xs font-semibold shadow-md transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="size-4" />
                    <span>Enregistrer le nouveau mot de passe</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
