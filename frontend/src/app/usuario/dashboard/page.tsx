'use client'

import { useAuth } from '../../providers/AuthProvider'
import { ProtectedRoute } from '../../providers/ProtectedRoute'
import { useRouter } from 'next/navigation'

export default function UsuarioDashboard() {
  const user = useAuth()
  const router = useRouter()

  return (
    <ProtectedRoute role="usuario">
      <main className="p-8 max-w-lg mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          Bienvenido, {user?.full_name}
        </h1>
        <button
          onClick={() => router.push('/usuario/solicitudes')}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Solicitar certificado
        </button>
        <button
          onClick={() => router.push('/usuario/seguimiento')}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          Seguimiento de solicitud
        </button>
      </main>
    </ProtectedRoute>
  )
}
