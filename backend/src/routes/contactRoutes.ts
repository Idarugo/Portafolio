import { Router } from 'express'
import {
  getAllContactsHandler,
  createContactHandler,
  deleteContactHandler
} from '../controllers/contactController'

const router = Router()

// Rutas para mensajes de contacto
router.get('/', getAllContactsHandler) // Obtener todos los mensajes
router.post('/', createContactHandler) // Crear un mensaje
router.delete('/:id', deleteContactHandler) // Eliminar un mensaje por ID

export default router
