import { Router } from 'express'
import authRoutes from './authRoutes'
import contactRoutes from './contactRoutes'
import projectRoutes from './projectRoutes'
import testimonialRoutes from './testimonialRoutes'

const router = Router()

router.get('/', (req, res) => {
  res.send('API Funcionando')
})

router.use('/auth', authRoutes) // Rutas relacionadas con autenticación
router.use('/contacto', contactRoutes)
router.use('/projects', projectRoutes)
router.use('/testimonios', testimonialRoutes)

export default router
