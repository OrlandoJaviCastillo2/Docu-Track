'use client'

import Link from 'next/link'
import React from 'react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <nav className="w-60 bg-gray-100 p-4">
        <h2 className="font-bold mb-4">Administrador</h2>
        <ul>
          <li className="mb-2">
            <Link href="/admin/panel">Panel de control</Link>
          </li>
          <li className="mb-2">
            <Link href="/admin/solicitudes">Solicitudes</Link>
          </li>
        </ul>
      </nav>
      <main className="flex-1 p-6">{children}</main>
    </div>
  )
}