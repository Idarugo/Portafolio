import { Pool } from 'mysql2/promise'

// Obtener todos los proyectos con sus enlaces
export async function getAllProjects(pool: Pool) {
  const sql = 'SELECT * FROM proyectos ORDER BY fecha_creacion DESC'
  const [rows]: any = await pool.query(sql)
  return rows
}

// Crear un proyecto con enlaces
export async function createProject(
  pool: Pool,
  projectData: {
    titulo: string
    descripcion: string
    imagen: string
    enlaces: { tipo_enlace: string; url: string }[]
  }
) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Insertar el proyecto
    const sqlProyecto = 'INSERT INTO proyectos (titulo, descripcion, imagen) VALUES (?, ?, ?)'
    const [result]: any = await connection.query(sqlProyecto, [
      projectData.titulo,
      projectData.descripcion,
      projectData.imagen
    ])

    const proyectoId = result.insertId

    // Insertar los enlaces relacionados
    const sqlEnlaces =
      'INSERT INTO proyecto_enlaces (proyecto_id, tipo_enlace, url) VALUES (?, ?, ?)'
    for (const enlace of projectData.enlaces) {
      await connection.query(sqlEnlaces, [proyectoId, enlace.tipo_enlace, enlace.url])
    }

    await connection.commit()
    return proyectoId
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// Actualizar un proyecto y sus enlaces
export async function updateProject(
  pool: Pool,
  id: number,
  projectData: { titulo: string; descripcion: string; imagen?: string | null; enlaces: any[] }
) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Actualizar el proyecto
    const sqlProyecto = `
      UPDATE proyectos 
      SET titulo = ?, descripcion = ?, imagen = ? 
      WHERE id = ?
    `
    await connection.query(sqlProyecto, [
      projectData.titulo,
      projectData.descripcion,
      projectData.imagen || null,
      id
    ])

    // Eliminar los enlaces existentes
    const sqlDeleteEnlaces = 'DELETE FROM proyecto_enlaces WHERE proyecto_id = ?'
    await connection.query(sqlDeleteEnlaces, [id])

    // Insertar los nuevos enlaces
    const sqlInsertEnlaces =
      'INSERT INTO proyecto_enlaces (proyecto_id, tipo_enlace, url) VALUES (?, ?, ?)'
    for (const enlace of projectData.enlaces) {
      await connection.query(sqlInsertEnlaces, [id, enlace.tipo_enlace, enlace.url])
    }

    await connection.commit()
    return true
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}

// Eliminar un proyecto y sus enlaces
export async function deleteProject(pool: Pool, id: number) {
  const connection = await pool.getConnection()
  try {
    await connection.beginTransaction()

    // Eliminar los enlaces relacionados
    const sqlDeleteEnlaces = 'DELETE FROM proyecto_enlaces WHERE proyecto_id = ?'
    await connection.query(sqlDeleteEnlaces, [id])

    // Eliminar el proyecto
    const sqlDeleteProyecto = 'DELETE FROM proyectos WHERE id = ?'
    const [result]: any = await connection.query(sqlDeleteProyecto, [id])

    await connection.commit()
    return result.affectedRows > 0
  } catch (error) {
    await connection.rollback()
    throw error
  } finally {
    connection.release()
  }
}
