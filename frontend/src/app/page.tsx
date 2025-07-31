// La página de bienvenida con enlaces a registro e inicio de sesión
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'

export default function HomePage() {
  const router = useRouter()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      // Si ya hay un token, podrías redirigir automáticamente
      // router.push('/usuario/dashboard') o lo que apliques
    }
  }, [])

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 text-center gap-6">
      <h1 className="text-3xl font-bold">Bienvenido a Docu-Track</h1>
      <p className="text-lg">Gestiona tus solicitudes de certificados oficiales fácilmente.</p>

      <div className="flex gap-4">
        <a href="/auth/register" className="bg-green-600 text-white px-4 py-2 rounded">
          Registrarse
        </a>
        <a href="/auth/login" className="bg-blue-600 text-white px-4 py-2 rounded">
          Iniciar Sesión
        </a>
      </div>
    </main>
  )
}
