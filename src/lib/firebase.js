import { initializeApp } from 'firebase/app'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth'
import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
  getDocs,
  getDocFromServer,
  collection,
  query,
  where,
  orderBy,
  limit,
} from 'firebase/firestore'
import firebaseConfig from '../../firebase-applet-config.json'

// 1. Initialize Firebase App
export const app = initializeApp(firebaseConfig)

// 2. Initialize Firestore with specific database ID (CRITICAL)
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId)

// 3. Initialize Firebase Auth
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

// 4. Test connection on boot
export async function testFirestoreConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'))
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection: client appears offline.', error)
    }
  }
}
testFirestoreConnection()

// 5. Hardened Firestore error handler
export const OperationType = {
  CREATE: 'create',
  UPDATE: 'update',
  DELETE: 'delete',
  LIST: 'list',
  GET: 'get',
  WRITE: 'write',
}

export function handleFirestoreError(error, operationType, path) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid || null,
      email: auth.currentUser?.email || null,
      emailVerified: auth.currentUser?.emailVerified || null,
      isAnonymous: auth.currentUser?.isAnonymous || null,
      tenantId: auth.currentUser?.tenantId || null,
      providerInfo:
        auth.currentUser?.providerData?.map((p) => ({
          providerId: p.providerId,
          email: p.email,
        })) || [],
    },
    operationType,
    path,
  }
  console.error('Firestore Error:', JSON.stringify(errInfo))
  throw new Error(JSON.stringify(errInfo))
}

// 6. Helper: Submit a client consultation / dossier evaluation
export async function submitConsultationDossier({ fullName, email, phone, service, message }) {
  // Generate valid ID matching '^[a-zA-Z0-9_\\-]+$'
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 8)}`
  const path = `consultationRequests/${requestId}`

  const payload = {
    fullName: fullName.trim().slice(0, 100),
    email: email.trim().slice(0, 100),
    phone: phone.trim().slice(0, 30),
    service: service.trim().slice(0, 80),
    message: (message || '').trim().slice(0, 2000),
    status: 'pending',
    createdAt: new Date().toISOString(),
    source: 'Website Intake Form',
  }

  try {
    await setDoc(doc(db, 'consultationRequests', requestId), payload)
    return { success: true, id: requestId }
  } catch (err) {
    handleFirestoreError(err, OperationType.CREATE, path)
  }
}

// 7. Auth helper: Google Sign In
export async function signInWithGoogle() {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user
    if (user) {
      // Sync basic user document
      const userRef = doc(db, 'users', user.uid)
      await setDoc(
        userRef,
        {
          uid: user.uid,
          email: user.email || '',
          displayName: user.displayName || 'Utilisateur',
          role: user.email === 'blacksmithpk8@gmail.com' ? 'admin' : 'client',
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      ).catch(() => {}) // Non-blocking
    }
    return user
  } catch (err) {
    // If the user deliberately closes or cancels the popup, treat it as a normal cancellation
    const isUserDismiss =
      err?.code === 'auth/popup-closed-by-user' ||
      err?.code === 'auth/cancelled-popup-request' ||
      (typeof err?.message === 'string' && err.message.includes('popup-closed-by-user'))

    if (isUserDismiss) {
      return null
    }

    console.warn('Google Sign In non-fatal issue:', err?.message || err)
    return null
  }
}

export async function logOut() {
  await signOut(auth)
}
