import React, { createContext, useContext, useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, signInWithGoogle as firebaseSignIn, logOut as firebaseLogOut } from '../lib/firebase'

const AuthContext = createContext({
  user: null,
  loading: true,
  signInWithGoogle: async () => null,
  logOut: async () => {},
})

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })
    return () => unsubscribe()
  }, [])

  const handleSignIn = useCallback(async () => {
    try {
      const loggedUser = await firebaseSignIn()
      return loggedUser
    } catch {
      return null
    }
  }, [])

  const handleLogOut = useCallback(async () => {
    try {
      await firebaseLogOut()
    } catch {
      // Quiet
    }
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithGoogle: handleSignIn,
        logOut: handleLogOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
