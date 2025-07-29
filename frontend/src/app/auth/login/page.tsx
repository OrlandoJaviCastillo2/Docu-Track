'use client'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8000/auth/login', {
        email,
        password
      })

      const { access_token, role } = response.data

      // Guarda el token JWT en cookies
      Cookies.set('token', access_token, { expires: 1 }) // 1 día

      // Redirige al dashboard correcto
      if (role === 'usuario') {
        router.push('/usuario/dashboard')
      } else if (role === 'administrador') {
        router.push('/admin/panel')
      }

    } catch (err) {
      setError('❌ Email o contraseña incorrectos')
      console.error(err)
    }
  }

  return (
    <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Iniciar Sesión</h1>

      <input
        type="email"
        placeholder="Correo"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 rounded"
      />

      <input
        type="password"
        placeholder="Contraseña"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Iniciar Sesión
      </button>

      {error && <p className="text-red-500 text-sm">{error}</p>}
    </main>
  )
}
