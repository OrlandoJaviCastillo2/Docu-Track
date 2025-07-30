'use client'

import { useState } from 'react'
import axios from 'axios'
import Cookies from 'js-cookie'

export default function SolicitudCertificado() {
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [cedula, setCedula] = useState('')
  const [fechaNacimiento, setFechaNacimiento] = useState('')
  const [mensaje, setMensaje] = useState('')

  const handleSubmit = async () => {
    try {
      const token = Cookies.get('token')
      const response = await axios.post(
        'http://localhost:8000/certificados/crear',
        {
          first_name: nombre,
          last_name: apellido,
          identity_number: cedula,
          birth_date: fechaNacimiento,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      setMensaje('✅ Solicitud enviada correctamente')
    } catch (error) {
      setMensaje('❌ Error al enviar la solicitud')
      console.error(error)
    }
  }

  return (
    <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-xl font-bold">Solicitud de Certificado</h1>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Apellido"
        value={apellido}
        onChange={(e) => setApellido(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="text"
        placeholder="Cédula"
        value={cedula}
        onChange={(e) => setCedula(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="date"
        placeholder="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChange={(e) => setFechaNacimiento(e.target.value)}
        className="border p-2 rounded"
      />

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Enviar Solicitud
      </button>

      {mensaje && <p className="text-sm mt-2">{mensaje}</p>}
    </main>
  )
}



