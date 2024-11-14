import { Pool } from 'mysql2/promise'

// Obtener todos los mensajes de contacto
export async function getAllContacts(pool: Pool) {
  const [rows]: any = await pool.query('SELECT * FROM contacto ORDER BY fecha DESC')
  return rows
}

// Crear un nuevo mensaje de contacto
export async function createContact(
  pool: Pool,
  data: { nombre: string; correo: string; mensaje: string }
) {
  const sql = 'INSERT INTO contacto (nombre, correo, mensaje) VALUES (?, ?, ?)'
  const [result]: any = await pool.query(sql, [data.nombre, data.correo, data.mensaje])
  return result.insertId // Retorna el ID del mensaje creado
}

// Eliminar un mensaje de contacto por ID
export async function deleteContact(pool: Pool, id: number) {
  const sql = 'DELETE FROM contacto WHERE id = ?'
  const [result]: any = await pool.query(sql, [id])
  return result.affectedRows > 0 // Devuelve true si se eliminó algo
}
