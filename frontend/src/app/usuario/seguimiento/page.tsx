'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../providers/AuthProvider'
import { ProtectedRoute } from '../../providers/ProtectedRoute'

interface SolicitudUsuario {
  id: number
  first_name: string
  last_name: string
  identity_number: string
  birth_date: string
  status: string
  identity_number_uuid: string
}

export default function SeguimientoPage() {
  const user = useAuth()
  const [solicitudes, setSolicitudes] = useState<SolicitudUsuario[]>([])
  const [loading, setLoading] = useState(false)

  const fetchMisSolicitudes = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const response = await axios.get('http://localhost:8000/certificados/solicitud', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSolicitudes(response.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMisSolicitudes()
  }, [])

  return (
    <ProtectedRoute role="usuario">
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Seguimiento de Mis Solicitudes</h1>
        <table className="min-w-full table-auto border-collapse">
          <thead>
            <tr>
              <th className="border px-4 py-2">Nombre</th>
              <th className="border px-4 py-2">Apellido</th>
              <th className="border px-4 py-2">Cédula</th>
              <th className="border px-4 py-2">Fecha de Nacimiento</th>
              <th className="border px-4 py-2">Estado</th>
            </tr>
          </thead>
          <tbody>
            {solicitudes.map((s) => (
              <tr key={s.id}>
                <td className="border px-4 py-2">{s.first_name}</td>
                <td className="border px-4 py-2">{s.last_name}</td>
                <td className="border px-4 py-2">{s.identity_number}</td>
                <td className="border px-4 py-2">{s.birth_date}</td>
                <td className="border px-4 py-2">{s.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  )
}
