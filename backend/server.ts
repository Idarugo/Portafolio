import express, { Application } from 'express'
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import cors from 'cors'
import routes from './src/routes/index'
import pool from './src/db'
import path from 'path'

dotenv.config()

const app: Application = express()

// Middleware para parsear JSON y formularios
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Conectar a la base de datos y agregarla al contexto de la aplicación
app.set('pool', pool)

// Middleware para habilitar CORS
app.use(
  cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
)

// Middleware para servir imágenes estáticas
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')))

// Rutas
app.use('/api', routes)

// Iniciar el servidor
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`)
})

export default app
