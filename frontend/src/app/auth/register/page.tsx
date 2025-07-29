'use client'

import { useState } from 'react'
import axios from 'axios'

export default function RegisterPage() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('usuario') // el 'usuario' o 'administrador'
  const [message, setMessage] = useState('')

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/auth/register', {
        full_name: fullName,
        email,
        password,
        role,
      })
      setMessage('✅ Registro exitoso')
    } catch (err: any) {
      setMessage('❌ Error en el registro')
      console.error(err)
    }
  }

  return (
    <main className="max-w-md mx-auto p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold mb-4">Registro</h1>
      <input
        type="text"
        placeholder="Nombre completo"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="email"
        placeholder="Correo electrónico"
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
      <select
        value={role}
        onChange={(e) => setRole(e.target.value)}
        className="border p-2 rounded"
      >
        <option value="usuario">Usuario</option>
        <option value="administrador">Administrador</option>
      </select>

      <button
        onClick={handleRegister}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Registrarse
      </button>

      {message && <p className="text-sm mt-2">{message}</p>}
    </main>

    
  )
}
