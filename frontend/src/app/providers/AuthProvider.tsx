//Crear un contexto global con la información del usuario (full_name, role) tras validar el JWT
'use client'

import React, { ReactNode, useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import axios from 'axios'

interface User {
  full_name: string
  role: string
}

const AuthContext = React.createContext<User | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      setLoading(false)
      return
    }
    axios
      .get('http://localhost:8000/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setUser(res.data))
      .catch(() => Cookies.remove('token'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return null
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
