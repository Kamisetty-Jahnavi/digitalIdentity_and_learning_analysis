import { NextResponse } from 'next/server'
import { authenticateUser, createToken } from '@/lib/auth'
import { generateCSRFToken } from '@/lib/csrf'

export async function POST(request: Request) {
  const { username, points } = await request.json()

  try {
    const user = await authenticateUser(username, points)
    const token = await createToken(user)
    const csrfToken = generateCSRFToken()

    const response = NextResponse.json({ 
      message: 'Authentication successful',
      csrfToken: csrfToken
    })
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 86400, // 1 day
      path: '/',
    })

    return response
  } catch (error) {
    return NextResponse.json({ message: 'Authentication failed' }, { status: 401 })
  }
}

