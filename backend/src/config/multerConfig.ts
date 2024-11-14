import multer from 'multer'
import path from 'path'
import fs from 'fs'

// Configuración de multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads/testimonios')) // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, uniqueSuffix) // Nombre único para evitar conflictos
  }
})

export const upload = multer({ storage }) // Exporta la configuración de multer

// Ruta para la carpeta de almacenamiento
const projectsUploadPath = path.join(__dirname, '../uploads/Proyectos')

// Crear la carpeta si no existe
if (!fs.existsSync(projectsUploadPath)) {
  fs.mkdirSync(projectsUploadPath, { recursive: true })
}

// Configuración de Multer para proyectos
const projectsStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, projectsUploadPath) // Carpeta para guardar imágenes de proyectos
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`
    cb(null, uniqueSuffix) // Nombre único del archivo
  }
})

// Exportar configuración de Multer para proyectos
export const uploadProjects = multer({ storage: projectsStorage })
