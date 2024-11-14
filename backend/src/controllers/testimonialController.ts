import { Request, Response } from 'express'
import path from 'path'
import multer from 'multer'
import fs from 'fs'
import {
  getApprovedTestimonials,
  getPendingTestimonials,
  getRejectedTestimonials,
  createTestimonial,
  updateApproval,
  deleteTestimonial
} from '../models/testimonialModel'

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/testimonios'))
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, uniqueSuffix)
  }
})

export const upload = multer({ storage })

// Obtener testimonios pendientes
export async function getPendingTestimonialsHandler(req: Request, res: Response) {
  try {
    const testimonials = await getPendingTestimonials(req.app.get('pool'))
    const updatedTestimonials = testimonials.map((testimonial: any) => ({
      ...testimonial,
      image: testimonial.image ? `http://localhost:3000${testimonial.image}` : null
    }))
    res.json(updatedTestimonials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los testimonios pendientes.' })
  }
}

// Obtener testimonios aprobados
export async function getApprovedTestimonialsHandler(req: Request, res: Response) {
  try {
    const testimonials = await getApprovedTestimonials(req.app.get('pool'))
    const updatedTestimonials = testimonials.map((testimonial: any) => ({
      ...testimonial,
      image: testimonial.image ? `http://localhost:3000${testimonial.image}` : null
    }))
    res.json(updatedTestimonials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los testimonios aprobados.' })
  }
}

// Obtener testimonios rechazados
export async function getRejectedTestimonialsHandler(req: Request, res: Response) {
  try {
    const testimonials = await getRejectedTestimonials(req.app.get('pool'))
    const updatedTestimonials = testimonials.map((testimonial: any) => ({
      ...testimonial,
      image: testimonial.image ? `http://localhost:3000${testimonial.image}` : null
    }))
    res.json(updatedTestimonials)
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al obtener los testimonios rechazados.' })
  }
}

// Crear un nuevo testimonio
export async function createTestimonialHandler(req: Request, res: Response) {
  try {
    const pool = req.app.get('pool')
    const imagePath = req.file ? `/uploads/testimonios/${req.file.filename}` : null

    const result = await createTestimonial(pool, {
      ...req.body,
      imagePath
    })

    res.status(201).json({
      message: 'Testimonio creado y pendiente de aprobación.',
      id: result
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el testimonio.' })
  }
}

// Aprobar o desaprobar un testimonio
export async function approveTestimonialHandler(req: Request, res: Response) {
  try {
    const pool = req.app.get('pool')
    const id = parseInt(req.params.id, 10)
    const { approved } = req.body

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido.' })
      return
    }

    const updated = await updateApproval(pool, id, Boolean(approved))
    if (!updated) {
      res.status(404).json({ error: 'Testimonio no encontrado.' })
      return
    }

    res.json({ message: 'Estado del testimonio actualizado.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al actualizar el testimonio.' })
  }
}

// Eliminar un testimonio
export async function deleteTestimonialHandler(req: Request, res: Response) {
  try {
    const pool = req.app.get('pool')
    const id = parseInt(req.params.id, 10)

    if (isNaN(id)) {
      res.status(400).json({ error: 'ID inválido.' })
      return
    }

    // Obtener el testimonio antes de eliminarlo para acceder a la ruta de la imagen
    const [testimonials]: any = await pool.query('SELECT * FROM testimonios WHERE id = ?', [id])
    if (testimonials.length === 0) {
      res.status(404).json({ error: 'Testimonio no encontrado.' })
      return
    }

    const testimonial = testimonials[0]

    // Eliminar el archivo de imagen si existe
    if (testimonial.image) {
      const imagePath = path.join(__dirname, '..', testimonial.image)
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error(`Error al eliminar la imagen: ${imagePath}`, err)
        } else {
          console.log(`Imagen eliminada: ${imagePath}`)
        }
      })
    }

    // Eliminar el testimonio de la base de datos
    const deleted = await deleteTestimonial(pool, id)
    if (!deleted) {
      res.status(404).json({ error: 'No se pudo eliminar el testimonio.' })
      return
    }

    res.json({ message: 'Testimonio eliminado con éxito.' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al eliminar el testimonio.' })
  }
}
