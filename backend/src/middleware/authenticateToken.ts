import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta'

export function authenticateToken(req: Request, res: Response, next: NextFunction): void {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) {
    res.status(401).json({ message: 'Token no proporcionado' })
    return
  }

  try {
    const payload = jwt.verify(token, SECRET_KEY)
    ;(req as any).user = payload // Añade el usuario al objeto `req`
    next()
  } catch (error) {
    res.status(403).json({ message: 'Token inválido o expirado' })
  }
}
