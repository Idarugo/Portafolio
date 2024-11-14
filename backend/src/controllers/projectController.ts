import { Request, Response } from 'express'
import { getAllProjects, createProject, updateProject, deleteProject } from '../models/projectModel'

// Obtener todos los proyectos con sus enlaces relacionados
export const getProjectsHandler = async (req: Request, res: Response) => {
  try {
    const pool = req.app.get('pool')

    // Obtener los proyectos desde el modelo
    const projects = await getAllProjects(pool)

    // Obtener los enlaces relacionados para cada proyecto
    const promises = projects.map(async (project: any) => {
      const [links]: any = await pool.query(
        'SELECT tipo_enlace, url FROM proyecto_enlaces WHERE proyecto_id = ?',
        [project.id]
      )
      return {
        ...project,
        enlaces: links
      }
    })

    const projectsWithLinks = await Promise.all(promises)

    res.json(projectsWithLinks)
  } catch (error) {
    console.error('Error al obtener los proyectos:', error)
    res.status(500).json({ error: 'Error al obtener los proyectos.' })
  }
}

// Crear un proyecto con sus enlaces relacionados
export const createProjectHandler = async (req: Request, res: Response) => {
  const { titulo, descripcion, enlaces } = req.body

  if (!titulo || !descripcion) {
    res.status(400).json({ error: 'Los campos título y descripción son obligatorios.' })
    return
  }

  const imagen = req.file?.filename // Nombre del archivo de imagen subido

  if (!imagen) {
    res.status(400).json({ error: 'La imagen es obligatoria.' })
    return
  }

  try {
    const enlacesParsed = JSON.parse(enlaces || '[]') // Parsear los enlaces si son enviados como JSON
    const pool = req.app.get('pool')
    const id = await createProject(pool, {
      titulo,
      descripcion,
      imagen,
      enlaces: enlacesParsed
    })
    res.status(201).json({ message: 'Proyecto creado con éxito.', id })
  } catch (error) {
    console.error('Error al crear el proyecto:', error)
    res.status(500).json({ error: 'Error al crear el proyecto.' })
  }
}

// Actualizar un proyecto y sus enlaces relacionados
export const updateProjectHandler = async (req: Request, res: Response) => {
  const { id } = req.params
  const { titulo, descripcion, enlaces } = req.body
  const imagen = req.file?.filename // Imagen actualizada (si se subió)

  if (!titulo || !descripcion) {
    res.status(400).json({ error: 'Los campos título y descripción son obligatorios.' })
    return
  }

  try {
    const enlacesParsed = JSON.parse(enlaces || '[]')
    const pool = req.app.get('pool')

    const success = await updateProject(pool, Number(id), {
      titulo,
      descripcion,
      imagen: imagen || null, // Usa la nueva imagen o conserva la existente
      enlaces: enlacesParsed
    })

    if (!success) {
      res.status(404).json({ error: 'Proyecto no encontrado.' })
      return
    }

    res.json({ message: 'Proyecto actualizado con éxito.' })
  } catch (error) {
    console.error('Error al actualizar el proyecto:', error)
    res.status(500).json({ error: 'Error al actualizar el proyecto.' })
  }
}

// Eliminar un proyecto y sus enlaces relacionados
export const deleteProjectHandler = async (req: Request, res: Response) => {
  const { id } = req.params

  try {
    const pool = req.app.get('pool')

    const success = await deleteProject(pool, Number(id))
    if (!success) {
      res.status(404).json({ error: 'Proyecto no encontrado.' })
      return
    }

    res.json({ message: 'Proyecto eliminado con éxito.' })
  } catch (error) {
    console.error('Error al eliminar el proyecto:', error)
    res.status(500).json({ error: 'Error al eliminar el proyecto.' })
  }
}
