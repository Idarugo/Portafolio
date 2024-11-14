import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { createUsuario, getUsuarioByEmail } from '../models/usuarioModel'
import { enviarCorreo } from '../utils/mailer'
import { Usuario } from '../types/interfaces'

const SECRET_KEY = process.env.SECRET_KEY || 'tu_clave_secreta' // Clave para JWT
const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secreto_para_testimonios' // Clave para tokens de testimonios
const usedTokens = new Set<string>()

// Ruta para registrar un usuario
export async function registerHandler(req: Request, res: Response): Promise<void> {
  const { nombre, email, password } = req.body

  if (!nombre || !email || !password) {
    res.status(400).json({ error: 'Todos los campos son obligatorios.' })
    return
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await createUsuario(req.app.get('pool'), { nombre, email, password: hashedPassword })

  res.status(201).json({ message: 'Usuario registrado exitosamente.' })
}

// Ruta para iniciar sesión
export async function loginHandler(req: Request, res: Response): Promise<void> {
  const { email, password } = req.body

  if (!email || !password) {
    res.status(400).json({ error: 'Correo y contraseña son obligatorios.' })
    return
  }

  const user = await getUsuarioByEmail(req.app.get('pool'), email)
  if (!user) {
    res.status(400).json({ error: 'Usuario no encontrado.' })
    return
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) {
    res.status(400).json({ error: 'Contraseña incorrecta.' })
    return
  }

  const token = jwt.sign({ id: user.id, email: user.email, es_admin: user.es_admin }, SECRET_KEY, {
    expiresIn: '1h'
  })

  res.json({ message: 'Inicio de sesión exitoso', token })
}

// Ruta para obtener el perfil del usuario
export async function getPerfilHandler(req: Request, res: Response): Promise<void> {
  const user = (req as any).user // Información del usuario autenticado
  res.json(user)
}

// Controladores existentes para tokens
export async function generateTokenHandler(req: Request, res: Response): Promise<void> {
  const { email } = req.body

  try {
    if (!email) {
      res.status(400).json({ error: 'El email es obligatorio para generar un token.' })
      return
    }

    const token = jwt.sign({ email }, TOKEN_SECRET, { expiresIn: '7d' })
    const formUrl = `http://localhost:5173/testimonios?token=${token}`

    const asunto = 'Tu enlace único para enviar el testimonio'
    const texto = `Hola, aquí está tu enlace único para enviar un testimonio: ${formUrl}`
    const html = `
      <p>Hola,</p>
      <p>Aquí está tu enlace único para enviar un testimonio:</p>
      <a href="${formUrl}" target="_blank">Haz clic aquí para enviar tu testimonio</a>
    `

    await enviarCorreo(email, asunto, texto, html)

    res.json({ message: 'Token generado y enviado por correo.', token })
  } catch (err) {
    console.error('Error al generar o enviar el token:', err)
    res.status(500).json({ error: 'Error al generar o enviar el token.' })
  }
}

export function verifyTokenHandler(req: Request, res: Response): void {
  const { token } = req.body

  try {
    if (!token) {
      res.status(400).json({ error: 'El token no fue proporcionado.' })
      return
    }

    if (usedTokens.has(token)) {
      res.json({ valid: false, error: 'Token ya utilizado.' })
      return
    }

    jwt.verify(token, TOKEN_SECRET)
    res.json({ valid: true })
  } catch (err) {
    res.status(401).json({ valid: false, error: 'Token inválido o expirado.' })
  }
}
