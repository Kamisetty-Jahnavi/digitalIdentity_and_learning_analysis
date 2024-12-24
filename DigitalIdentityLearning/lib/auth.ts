import { sign, verify } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import pool from './db'
import type { NextRequest } from 'next/server'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function createToken(user: { id: number; username: string; user_type: string }) {
  return sign(user, JWT_SECRET, { expiresIn: '1d' })
}

export async function verifyToken(token: string) {
  return verify(token, JWT_SECRET)
}

export async function authenticateUser(username: string, points: { x: number; y: number }[]) {
  const client = await pool.connect()
  try {
    const result = await client.query('SELECT * FROM users WHERE username = $1', [username])
    if (result.rows.length === 0) {
      throw new Error('User not found')
    }

    const user = result.rows[0]
    const storedPoints = JSON.parse(user.pass_points)

    const isAuthenticated = points.every((point, index) => {
      const storedPoint = storedPoints[index]
      const distance = Math.sqrt(
        Math.pow(point.x - storedPoint.x, 2) + Math.pow(point.y - storedPoint.y, 2)
      )
      return distance < 10 // Allow for a 10-pixel tolerance
    })

    if (!isAuthenticated) {
      throw new Error('Authentication failed')
    }

    return {
      id: user.id,
      username: user.username,
      user_type: user.user_type,
    }
  } finally {
    client.release()
  }
}

export function getUserFromRequest(req: NextRequest) {
  const user = req.headers.get('user')
  return user ? JSON.parse(user) : null
}

