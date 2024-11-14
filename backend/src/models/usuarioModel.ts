import { Pool, RowDataPacket } from 'mysql2/promise'
import { Usuario } from '../types/interfaces'

// Obtiene un usuario por email
export async function getUsuarioByEmail(pool: Pool, email: string): Promise<Usuario | null> {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, email, password, es_admin FROM usuarios WHERE email = ?`,
    [email]
  )

  return rows.length > 0 ? (rows[0] as Usuario) : null
}

// Crear un nuevo usuario
export async function createUsuario(
  pool: Pool,
  usuarioData: { nombre: string; email: string; password: string }
): Promise<void> {
  const sql = `
    INSERT INTO usuarios (nombre, email, password, es_admin)
    VALUES (?, ?, ?, FALSE)
  `
  await pool.query(sql, [usuarioData.nombre, usuarioData.email, usuarioData.password])
}
