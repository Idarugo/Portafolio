import { Router } from 'express'
import { uploadProjects } from '../config/multerConfig' // Configuración reutilizable para proyectos
import {
  getProjectsHandler,
  createProjectHandler,
  updateProjectHandler,
  deleteProjectHandler
} from '../controllers/projectController'

const router = Router()

// Rutas para proyectos
router.get('/', getProjectsHandler) // Obtener todos los proyectos
router.post('/', uploadProjects.single('imagen'), createProjectHandler) // Crear un proyecto con imagen
router.put('/:id', uploadProjects.single('imagen'), updateProjectHandler) // Actualizar un proyecto con imagen
router.delete('/:id', deleteProjectHandler) // Eliminar un proyecto

export default router
