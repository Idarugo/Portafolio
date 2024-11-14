import { Request, Response } from 'express'
import { getAllContacts, createContact, deleteContact } from '../models/contactModel'

// Obtener todos los mensajes de contacto
export const getAllContactsHandler = async (req: Request, res: Response): Promise<void> => {
  try {
    const pool = req.app.get('pool') // Obtener pool desde req.app
    const contacts = await getAllContacts(pool)
    res.status(200).json(contacts)
  } catch (error) {
    console.error('Error al obtener los contactos:', error)
    res.status(500).json({ error: 'Error al obtener los contactos.' })
  }
}

// Crear un nuevo mensaje de contacto
export const createContactHandler = async (req: Request, res: Response): Promise<void> => {
  const { nombre, correo, mensaje } = req.body

  if (!nombre || !correo || !mensaje) {
    res.status(400).json({ error: 'Todos los campos son obligatorios.' })
    return
  }

  try {
    const pool = req.app.get('pool') // Obtener pool desde req.app
    const id = await createContact(pool, { nombre, correo, mensaje })
    res.status(201).json({ message: 'Mensaje de contacto enviado con éxito.', id })
  } catch (error) {
    console.error('Error al crear el contacto:', error)
    res.status(500).json({ error: 'Error al enviar el mensaje de contacto.' })
  }
}

// Eliminar un mensaje de contacto por ID
export const deleteContactHandler = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params

  if (!id) {
    res.status(400).json({ error: 'El ID es obligatorio para eliminar un contacto.' })
    return
  }

  try {
    const pool = req.app.get('pool') // Obtener pool desde req.app
    const success = await deleteContact(pool, Number(id))
    if (!success) {
      res.status(404).json({ error: 'El mensaje de contacto no existe.' })
      return
    }
    res.status(200).json({ message: 'Mensaje de contacto eliminado con éxito.' })
  } catch (error) {
    console.error('Error al eliminar el contacto:', error)
    res.status(500).json({ error: 'Error al eliminar el mensaje de contacto.' })
  }
}
