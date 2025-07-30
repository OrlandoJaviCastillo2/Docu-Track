'use client'

import { useEffect, useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'
import { useAuth } from '../../providers/AuthProvider'
import { ProtectedRoute } from '../../providers/ProtectedRoute'

interface Solicitud {
  id: number
  first_name: string
  last_name: string
  identity_number: string
  birth_date: string
  status: string
  identity_number_uuid: string
}

const statusOptions = ['Recibido', 'En validación', 'Rechazado', 'Emitido']

export default function SolicitudesAdminPage() {
  const user = useAuth()
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const fetchSolicitudes = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const response = await axios.get('http://localhost:8000/admin/solicitudes', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      setSolicitudes(response.data)
    } catch (error) {
      console.error(error)
      setMessage('Error al cargar solicitudes')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      const token = Cookies.get('token')
      await axios.patch(
        `http://localhost:8000/admin/solicitudes/${id}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setMessage('Estado actualizado correctamente')
      fetchSolicitudes()
    } catch (error) {
      console.error(error)
      setMessage('Error al actualizar estado')
    }
  }

  return (
    <ProtectedRoute role="administrador">
      <main className="p-8 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Gestión de Solicitudes</h1>
        {message && <p className="mb-4 text-green-600">{message}</p>}
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
                <td className="border px-4 py-2">
                  <select
                    value={s.status}
                    onChange={(e) => handleStatusChange(s.id, e.target.value)}
                    className="border px-2 py-1 rounded"
                  >
                    {statusOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
    </ProtectedRoute>
  )
}
