//Carga los datos a partir de `/certificados/mis_solicitudes` con token.
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

export default function SeguimientoPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([])
  const [loading, setLoading] = useState(false)
  const user = useAuth()

  const fetchSolicitudes = async () => {
    setLoading(true)
    try {
      const token = Cookies.get('token')
      const { data } = await axios.get(
        'http://localhost:8000/certificados/mis_solicitudes',
        { headers: { Authorization: `Bearer ${token}` } }
      )
      setSolicitudes(data)
    } catch (err) {
      console.error('Error al obtener solicitudes:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSolicitudes()
  }, [])

  return (
    <ProtectedRoute role="usuario">
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">Seguimiento de Solicitudes</h1>
        {loading ? (
          <p>Cargando...</p>
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="border px-4 py-2">Nombre</th>
                <th className="border px-4 py-2">Apellido</th>
                <th className="border px-4 py-2">Cédula</th>
                <th className="border px-4 py-2">Fecha Nac.</th>
                <th className="border px-4 py-2">Estado</th>
              </tr>
            </thead>
            <tbody>
              {solicitudes.map((s) => {
                let color = 'gray'
                switch (s.status) {
                  case 'pendiente': color = 'yellow'; break
                  case 'Recibido': color = 'blue'; break
                  case 'En validación': color = 'orange'; break
                  case 'Rechazado': color = 'red'; break
                  case 'Emitido': color = 'green'; break
                }
                return (
                  <tr key={s.id} className="hover:bg-gray-100">
                    <td className="border px-4 py-2">{s.first_name}</td>
                    <td className="border px-4 py-2">{s.last_name}</td>
                    <td className="border px-4 py-2">{s.identity_number}</td>
                    <td className="border px-4 py-2">{s.birth_date}</td>
                    <td className="border px-4 py-2">
                      <span className={`inline-block px-2 py-1 rounded bg-${color}-200`}>{s.status}</span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </main>
    </ProtectedRoute>
  )
}
