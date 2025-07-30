import React from 'react'
import { AuthProvider } from './providers/AuthProvider'

export const metadata = {
  title: 'Docu-Track',
  description: 'Seguimiento de certificados oficiales',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
