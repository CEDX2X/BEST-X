import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { doc, onSnapshot, setDoc, collection, updateDoc, deleteDoc, orderBy, query } from 'firebase/firestore'
import { db } from '../lib/firebase'
import { defaultSiteContent } from '../data/defaultSiteContent'

const SiteContentContext = createContext(null)

const LOCAL_STORAGE_KEY = 'best_travel_site_content_v1'

export function SiteContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_KEY)
      if (cached) {
        const parsed = JSON.parse(cached)
        return {
          ...defaultSiteContent,
          ...parsed,
          security: { ...defaultSiteContent.security, ...parsed.security },
          texts: { ...defaultSiteContent.texts, ...parsed.texts },
          socialLinks: { ...defaultSiteContent.socialLinks, ...parsed.socialLinks },
          images: { ...defaultSiteContent.images, ...parsed.images },
          general: { ...defaultSiteContent.general, ...parsed.general },
          offers: Array.isArray(parsed.offers) && parsed.offers.length > 0 ? parsed.offers : defaultSiteContent.offers,
        }
      }
    } catch (e) {
      console.warn('Local storage load error:', e)
    }
    return defaultSiteContent
  })

  const [consultations, setConsultations] = useState([])
  const [loadingConsultations, setLoadingConsultations] = useState(true)
  const [isSyncing, setIsSyncing] = useState(false)

  // 1. Sync live site configuration from Firestore
  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, 'siteSettings', 'main'),
      (snapshot) => {
        if (snapshot.exists()) {
          const remoteData = snapshot.data()
          setContent((prev) => {
            const merged = {
              ...prev,
              ...remoteData,
              security: { ...prev.security, ...remoteData.security },
              texts: { ...prev.texts, ...remoteData.texts },
              socialLinks: { ...prev.socialLinks, ...remoteData.socialLinks },
              images: { ...prev.images, ...remoteData.images },
              general: { ...prev.general, ...remoteData.general },
              offers: Array.isArray(remoteData.offers) ? remoteData.offers : prev.offers,
            }
            try {
              localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(merged))
            } catch {}
            return merged
          })
        }
      },
      (error) => {
        console.warn('Firestore settings listener:', error)
      }
    )

    return () => unsub()
  }, [])

  // 2. Sync live consultation requests from Firestore
  useEffect(() => {
    let unsub = () => {}
    try {
      const q = collection(db, 'consultationRequests')
      unsub = onSnapshot(
        q,
        (snapshot) => {
          const list = []
          snapshot.forEach((d) => {
            list.push({ id: d.id, ...d.data() })
          })
          // Sort by creation desc
          list.sort((a, b) => {
            const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0
            const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0
            return dateB - dateA
          })
          setConsultations(list)
          setLoadingConsultations(false)
        },
        (err) => {
          console.warn('Firestore consultations listener:', err)
          setLoadingConsultations(false)
        }
      )
    } catch (err) {
      console.warn('Consultations listener setup:', err)
      setLoadingConsultations(false)
    }

    return () => unsub()
  }, [])

  // Save content to Firestore & localStorage
  const saveContent = useCallback(async (newContent) => {
    setIsSyncing(true)
    const payload = {
      ...newContent,
      updatedAt: new Date().toISOString(),
    }
    // Update local immediately for zero lag
    setContent(payload)
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(payload))
    } catch {}

    // Persist to Firestore
    try {
      await setDoc(doc(db, 'siteSettings', 'main'), payload, { merge: true })
      return { success: true }
    } catch (err) {
      console.error('Failed to sync to Firestore:', err)
      // Keep local changes
      return { success: true, localOnly: true }
    } finally {
      setIsSyncing(false)
    }
  }, [])

  // Offers management
  const addOffer = useCallback(async (newOffer) => {
    const offerId = `offer_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`
    const offerWithId = {
      id: offerId,
      active: true,
      serviceCategory: 'canada',
      title: 'Nouvelle offre',
      badge: 'Nouveau',
      desc: '',
      price: 'Sur devis',
      timeline: 'Variable',
      image: content.images?.heroImage || defaultSiteContent.images.heroImage,
      highlights: ['Accompagnement rigoureux'],
      ...newOffer,
    }
    const updatedOffers = [offerWithId, ...content.offers]
    await saveContent({
      ...content,
      offers: updatedOffers,
    })
    return offerId
  }, [content, saveContent])

  const updateOffer = useCallback(async (id, patch) => {
    const updatedOffers = content.offers.map((off) => (off.id === id ? { ...off, ...patch } : off))
    await saveContent({
      ...content,
      offers: updatedOffers,
    })
  }, [content, saveContent])

  const deleteOffer = useCallback(async (id) => {
    const updatedOffers = content.offers.filter((off) => off.id !== id)
    await saveContent({
      ...content,
      offers: updatedOffers,
    })
  }, [content, saveContent])

  const toggleOfferActive = useCallback(async (id) => {
    const updatedOffers = content.offers.map((off) =>
      off.id === id ? { ...off, active: !off.active } : off
    )
    await saveContent({
      ...content,
      offers: updatedOffers,
    })
  }, [content, saveContent])

  // Consultations management
  const updateConsultationStatus = useCallback(async (id, newStatus) => {
    try {
      await updateDoc(doc(db, 'consultationRequests', id), {
        status: newStatus,
        updatedAt: new Date().toISOString(),
      })
      setConsultations((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      )
    } catch (err) {
      console.error('Error updating consultation status:', err)
    }
  }, [])

  const deleteConsultation = useCallback(async (id) => {
    try {
      await deleteDoc(doc(db, 'consultationRequests', id))
      setConsultations((prev) => prev.filter((c) => c.id !== id))
    } catch (err) {
      console.error('Error deleting consultation:', err)
    }
  }, [])

  const updateAdminPassword = useCallback(async (newPassword) => {
    const updated = {
      ...content,
      security: {
        adminPassword: newPassword,
      },
    }
    await saveContent(updated)
  }, [content, saveContent])

  return (
    <SiteContentContext.Provider
      value={{
        content,
        saveContent,
        adminPassword: content.security?.adminPassword || 'Henribest123',
        updateAdminPassword,
        offers: content.offers || [],
        addOffer,
        updateOffer,
        deleteOffer,
        toggleOfferActive,
        consultations,
        loadingConsultations,
        updateConsultationStatus,
        deleteConsultation,
        isSyncing,
      }}
    >
      {children}
    </SiteContentContext.Provider>
  )
}

export function useSiteContent() {
  const context = useContext(SiteContentContext)
  if (!context) {
    throw new Error('useSiteContent must be used within a SiteContentProvider')
  }
  return context
}
