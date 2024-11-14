import { Router } from 'express'
import {
  generateTokenHandler,
  verifyTokenHandler,
  loginHandler,
  registerHandler,
  getPerfilHandler
} from '../controllers/authController'
import { authenticateToken } from '../middleware/authenticateToken'

const router = Router()

// Rutas existentes para generar y verificar tokens
router.post('/generate-token', generateTokenHandler)
router.post('/verify-token', verifyTokenHandler)

// Nuevas rutas para autenticación de usuarios
router.post('/login', loginHandler) // Ruta para iniciar sesión
router.post('/register', registerHandler) // Ruta para registrar un usuario
router.get('/me', authenticateToken, getPerfilHandler) // Ruta para obtener perfil del usuario autenticado

export default router
