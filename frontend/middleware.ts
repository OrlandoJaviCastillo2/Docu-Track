import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('token')?.value
  const { pathname } = req.nextUrl

  // Si no hay token y entra en /admin o /usuario → login
  if (!token && (pathname.startsWith('/admin') || pathname.startsWith('/usuario'))) {
    return NextResponse.redirect(new URL('/auth/login', req.url))
  }

  // Validación para admin
  if (token && pathname.startsWith('/admin')) {
    try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())
      const role = payload.role
      if (role !== 'administrador' && role !== 'admin') {
        return NextResponse.redirect(new URL('/usuario/dashboard', req.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  // Validación para usuario
  if (token && pathname.startsWith('/usuario')) {
    try {
      const payloadBase64 = token.split('.')[1]
      const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString())
      const role = payload.role
      if (role !== 'usuario' && role !== 'user') {
        return NextResponse.redirect(new URL('/admin/panel', req.url))
      }
    } catch {
      return NextResponse.redirect(new URL('/auth/login', req.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/usuario/:path*'],
}