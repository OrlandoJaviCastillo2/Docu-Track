'use client'

import { useRouter } from 'next/navigation'
import React, { ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'
import { useAuth } from './AuthProvider'

type Role = 'usuario' | 'administrador'

export function ProtectedRoute({ children, role }: { children: ReactNode; role: Role }) {
  const router = useRouter()
  const user = useAuth()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) {
      router.replace('/auth/login')
      return
    }
    if (user) {
      const isAdmin = user.role === 'administrador' || user.role === 'admin'
      const isUser = user.role === 'usuario' || user.role === 'user'
      if (role === 'administrador' && !isAdmin) {
        router.replace('/usuario/dashboard')
      }
      if (role === 'usuario' && !isUser) {
        router.replace('/admin/panel')
      }
    }
  }, [user, router, role])

  // Nunca renderices hasta que user exista y rol coincida
  if (!user) return null
  if (role === 'administrador' && !(user.role === 'administrador' || user.role === 'admin')) return null
  if (role === 'usuario' && !(user.role === 'usuario' || user.role === 'user')) return null

  return <>{children}</>
}