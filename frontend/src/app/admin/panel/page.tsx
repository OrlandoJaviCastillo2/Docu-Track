'use client'

import { useAuth } from '../../providers/AuthProvider'
import { ProtectedRoute } from '../../providers/ProtectedRoute'
import { useRouter } from 'next/navigation'

export default function AdminPanel() {
  const user = useAuth()
  const router = useRouter()

  return (
    <ProtectedRoute role="administrador">
      <main className="p-8 max-w-lg mx-auto flex flex-col gap-4">
        <h1 className="text-2xl font-bold">
          Panel de Control - {user?.full_name}
        </h1>
        <button
          onClick={() => router.push('/admin/solicitudes')}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Gestionar solicitudes
        </button>
      </main>
    </ProtectedRoute>
  )
}
