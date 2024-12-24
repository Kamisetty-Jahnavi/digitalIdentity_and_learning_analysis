import { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { username, userType, points } = req.body;

    try {
      const client = await pool.connect();
      const result = await client.query(
        'SELECT * FROM users WHERE username = $1 AND user_type = $2',
        [username, userType]
      );

      if (result.rows.length === 0) {
        res.status(401).json({ message: 'User not found' });
        return;
      }

      const user = result.rows[0];
      const storedPoints = JSON.parse(user.pass_points);

      // Compare the clicked points with stored points
      const isAuthenticated = points.every((point: { x: number; y: number }, index: number) => {
        const storedPoint = storedPoints[index];
        const distance = Math.sqrt(
          Math.pow(point.x - storedPoint.x, 2) + Math.pow(point.y - storedPoint.y, 2)
        );
        return distance < 10; // Allow for a 10-pixel tolerance
      });

      if (isAuthenticated) {
        res.status(200).json({ message: 'Authentication successful' });
      } else {
        res.status(401).json({ message: 'Authentication failed' });
      }

      client.release();
    } catch (error) {
      console.error('Error during authentication:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

