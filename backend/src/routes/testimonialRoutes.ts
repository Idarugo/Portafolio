import { Router } from 'express'
import { upload } from '../config/multerConfig' // Importar la configuración de multer
import {
  getPendingTestimonialsHandler,
  getApprovedTestimonialsHandler,
  getRejectedTestimonialsHandler,
  createTestimonialHandler,
  approveTestimonialHandler,
  deleteTestimonialHandler
} from '../controllers/testimonialController'

const router = Router()

// Rutas para testimonios
router.get('/pendientes', getPendingTestimonialsHandler)
router.get('/aprobados', getApprovedTestimonialsHandler)
router.get('/rechazados', getRejectedTestimonialsHandler)

// Crear un testimonio con imagen
router.post('/', upload.single('image'), createTestimonialHandler) // Middleware `upload` para manejar imágenes

// Aprobar o desaprobar un testimonio
router.patch('/:id', approveTestimonialHandler)

// Eliminar un testimonio
router.delete('/:id', deleteTestimonialHandler)

export default router
