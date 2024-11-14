import { Pool } from 'mysql2/promise'

// Obtener testimonios pendientes
export async function getPendingTestimonials(pool: Pool) {
  const [rows]: any = await pool.query('SELECT * FROM testimonios WHERE approved IS NULL')
  return rows
}

// Obtener testimonios rechazados
export async function getRejectedTestimonials(pool: Pool) {
  const [rows]: any = await pool.query('SELECT * FROM testimonios WHERE approved = 0')
  return rows
}

// Obtener testimonios aprobados
export async function getApprovedTestimonials(pool: Pool) {
  const [rows]: any = await pool.query('SELECT * FROM testimonios WHERE approved = 1')
  return rows
}

// Crear un nuevo testimonio
export async function createTestimonial(pool: Pool, data: any) {
  const sql = 'INSERT INTO testimonios (name, position, text, image) VALUES (?, ?, ?, ?)'
  const [result]: any = await pool.query(sql, [data.name, data.position, data.text, data.imagePath])
  return result.insertId
}

// Aprobar o desaprobar un testimonio
export async function updateApproval(pool: Pool, id: number, approved: boolean) {
  const sql = 'UPDATE testimonios SET approved = ? WHERE id = ?'
  const [result]: any = await pool.query(sql, [approved, id])
  return result.affectedRows > 0
}

// Eliminar un testimonio
export async function deleteTestimonial(pool: Pool, id: number) {
  const sql = 'DELETE FROM testimonios WHERE id = ?'
  const [result]: any = await pool.query(sql, [id])
  return result.affectedRows > 0 // Devuelve true si se eliminó algo
}
