<template>
  <div class="admin-contacts">
    <h1>Administrar Contactos</h1>
    <table class="contacts-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Correo</th>
          <th>Mensaje</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contacts" :key="contact.id">
          <td>{{ contact.nombre }}</td>
          <td>{{ contact.correo }}</td>
          <td>{{ contact.mensaje }}</td>
          <td>{{ formatDate(contact.fecha) }}</td>
          <td>
            <button @click="deleteContact(contact.id)" class="btn btn-danger">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>
    <p v-if="contacts.length === 0">No hay contactos registrados.</p>
  </div>
</template>
  
  <script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

// Lista de contactos
const contacts = ref([])

// Función para obtener los contactos desde el servidor
const fetchContacts = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contacto')
    if (!response.ok) throw new Error('Error al obtener los contactos.')
    contacts.value = await response.json()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: error.message
    })
  }
}

// Función para eliminar un contacto
const deleteContact = async (id) => {
  const confirm = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'No podrás recuperar este mensaje.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar'
  })

  if (confirm.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:3000/api/contacto/${id}`, {
        method: 'DELETE'
      })
      if (!response.ok) throw new Error('Error al eliminar el contacto.')
      contacts.value = contacts.value.filter((contact) => contact.id !== id)
      Swal.fire('Eliminado', 'El mensaje ha sido eliminado.', 'success')
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: error.message
      })
    }
  }
}

// Formatear la fecha
const formatDate = (date) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(date).toLocaleDateString('es-ES', options)
}

// Obtener los contactos al cargar la vista
onMounted(() => {
  fetchContacts()
})
</script>
<style scoped>
:root {
  --color-oscuro: #2d3e45; /* Color Oscuro */
  --color-principal: #4c838b; /* Color Principal */
  --color-secundario: #7fbfd1; /* Color Secundario */
  --color-claro: #d0e3e7; /* Color Claro */
  --color-neutro: #e6dfd6; /* Color Neutro */
}

.admin-contacts {
  padding: 2rem;
  background-color: var(--color-claro); /* Fondo claro */
  color: var(--color-oscuro); /* Texto oscuro */
}

h1 {
  text-align: center;
  margin-bottom: 1.5rem;
  color: var(--color-principal); /* Título en color principal */
}

.contacts-table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
  background-color: var(--color-neutro); /* Fondo neutro */
  color: var(--color-oscuro); /* Texto oscuro */
}

.contacts-table th,
.contacts-table td {
  padding: 1rem;
  border: 1px solid var(--color-secundario); /* Bordes secundarios */
  text-align: left;
}

.contacts-table th {
  background-color: var(--color-principal); /* Fondo principal */
  color: var(--color-claro); /* Texto claro */
}

.contacts-table tbody tr:hover {
  background-color: var(--color-secundario); /* Fondo secundario al hover */
}

.btn {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-danger {
  background-color: var(--color-oscuro); /* Color oscuro */
  color: var(--color-neutro); /* Texto neutro */
}

.btn-danger:hover {
  background-color: var(--color-principal); /* Cambiar a color principal al hover */
  transform: scale(1.05);
}
</style>
