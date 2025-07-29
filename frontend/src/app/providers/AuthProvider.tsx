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

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      return
    }

    axios.get('http://127.0.0.1:8000/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => setUser(res.data))
      .catch(() => Cookies.remove('token'))
  }, [])

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return React.useContext(AuthContext)
}
