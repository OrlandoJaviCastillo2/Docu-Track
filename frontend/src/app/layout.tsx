// src/app/layout.tsx
export const metadata = {
  title: 'Docu-Track',
  description: 'Seguimiento de certificados oficiales',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html>
      <body>
        {children}
      </body>
    </html>
  )
}
