'use client'

import Link from 'next/link'
import React from 'react'

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-60 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Usuario</h2>
        <ul>
          <li className="mb-2">
            <Link href="/usuario/dashboard">Dashboard</Link>
          </li>
          <li className="mb-2">
            <Link href="/usuario/solicitudes">Solicitudes</Link>
          </li>
          <li className="mb-2">
            <Link href="/usuario/seguimiento">Seguimiento</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}