'use client'

import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'
import Cookies from 'js-cookie'

export function ProtectedRoute({
  children,
  role,
}: { children: ReactNode; role: 'usuario' | 'administrador' }) {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (!token) router.push('/auth/login')
    // Opcional: validar rol aquí con backend, redirect si no corresponde
  }, [router])

  return <>{children}</>
}
