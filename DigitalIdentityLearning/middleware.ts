import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyToken } from './lib/auth'
import { verifyCSRFToken } from './lib/csrf'

export async function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  try {
    const decoded = await verifyToken(token)
    const requestHeaders = new Headers(request.headers)
    requestHeaders.set('user', JSON.stringify(decoded))

    if (['POST', 'PUT', 'DELETE'].includes(request.method)) {
      const csrfToken = request.headers.get('X-CSRF-Token')
      if (!csrfToken || !verifyCSRFToken(csrfToken)) {
        return NextResponse.json({ message: 'Invalid CSRF token' }, { status: 403 })
      }
    }

    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    })
  } catch (error) {
    return NextResponse.redirect(new URL('/login', request.url))
  }
}

export const config = {
  matcher: ['/teacher-dashboard/:path*', '/student-dashboard/:path*', '/api/:path*'],
}

