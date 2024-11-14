<template>
  <section class="admin-projects">
    <h2>Administrar Proyectos</h2>
    <button class="btn add-btn" data-bs-toggle="modal" data-bs-target="#projectModal">
      Agregar Proyecto
    </button>

    <!-- Tabla de proyectos -->
    <table class="projects-table">
      <thead>
        <tr>
          <th>Título</th>
          <th>Descripción</th>
          <th>Enlaces</th>
          <th>Imagen</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(project, index) in projects" :key="index">
          <td>{{ project.titulo }}</td>
          <td>{{ project.descripcion }}</td>
          <td>
            <ul>
              <li v-for="(enlace, idx) in project.enlaces" :key="idx">
                <a :href="enlace.url" target="_blank">{{ enlace.tipo_enlace }}</a>
              </li>
            </ul>
          </td>
          <td>
            <img
              :src="`http://localhost:3000/uploads/proyectos/${project.imagen}`"
              alt="Imagen del proyecto"
              class="project-image"
            />
          </td>
          <td>
            <button class="btn edit-btn" @click="openModal('edit', project)">Editar</button>
            <button class="btn delete-btn" @click="deleteProject(project.id)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </table>

    <!-- Modal -->
    <div
      class="modal fade"
      id="projectModal"
      tabindex="-1"
      aria-labelledby="projectModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="projectModalLabel">
              {{ modalMode === 'add' ? 'Agregar Proyecto' : 'Editar Proyecto' }}
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <form @submit.prevent="submitForm">
            <div class="modal-body">
              <div class="mb-3">
                <label for="titulo" class="form-label">Título</label>
                <input
                  type="text"
                  id="titulo"
                  v-model="form.titulo"
                  class="form-control"
                  required
                />
              </div>
              <div class="mb-3">
                <label for="descripcion" class="form-label">Descripción</label>
                <textarea
                  id="descripcion"
                  v-model="form.descripcion"
                  class="form-control"
                  required
                ></textarea>
              </div>
              <div class="mb-3">
                <label for="imagen" class="form-label">Imagen</label>
                <input type="file" id="imagen" @change="handleFileChange" class="form-control" />
              </div>
              <div class="mb-3">
                <label>Enlaces</label>
                <div
                  v-for="(link, index) in form.enlaces"
                  :key="index"
                  class="d-flex align-items-center gap-2 mb-2"
                >
                  <select v-model="link.tipo_enlace" class="form-select">
                    <option value="Ver Proyecto">Ver Proyecto</option>
                    <option value="Ver Código">Ver Código</option>
                  </select>
                  <input
                    type="url"
                    v-model="link.url"
                    placeholder="URL del enlace"
                    class="form-control"
                    required
                  />
                  <button type="button" class="btn btn-danger btn-sm" @click="removeLink(index)">
                    Eliminar
                  </button>
                </div>
                <button type="button" class="btn btn-secondary btn-sm" @click="addLink">
                  Agregar Enlace
                </button>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">
                Cancelar
              </button>
              <button type="submit" class="btn btn-success">Guardar</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'

const projects = ref([])
const modalMode = ref('add') // 'add' o 'edit'
const form = reactive({
  id: null,
  titulo: '',
  descripcion: '',
  imagen: null,
  enlaces: []
})

const fetchProjects = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/projects')
    projects.value = data
  } catch (error) {
    console.error('Error al cargar los proyectos:', error)
  }
}

const openModal = (mode, project = null) => {
  modalMode.value = mode
  if (mode === 'edit' && project) {
    form.id = project.id
    form.titulo = project.titulo
    form.descripcion = project.descripcion
    form.enlaces = project.enlaces || []
    form.imagen = null
  } else {
    form.id = null
    form.titulo = ''
    form.descripcion = ''
    form.enlaces = []
    form.imagen = null
  }
}

const handleFileChange = (event) => {
  form.imagen = event.target.files[0]
}

const addLink = () => {
  form.enlaces.push({ tipo_enlace: 'Ver Proyecto', url: '' })
}

const removeLink = (index) => {
  form.enlaces.splice(index, 1)
}

const submitForm = async () => {
  const formData = new FormData()
  formData.append('titulo', form.titulo)
  formData.append('descripcion', form.descripcion)
  if (form.imagen) formData.append('imagen', form.imagen)
  formData.append('enlaces', JSON.stringify(form.enlaces))

  try {
    if (modalMode.value === 'add') {
      await axios.post('http://localhost:3000/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      Swal.fire({
        icon: 'success',
        title: 'Proyecto agregado',
        text: 'El proyecto se ha agregado exitosamente.',
        confirmButtonColor: '#81b29a'
      })
    } else {
      await axios.put(`http://localhost:3000/api/projects/${form.id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      Swal.fire({
        icon: 'success',
        title: 'Proyecto actualizado',
        text: 'El proyecto se ha actualizado correctamente.',
        confirmButtonColor: '#81b29a'
      })
    }
    fetchProjects()
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al procesar el proyecto.',
      confirmButtonColor: '#e63946'
    })
    console.error('Error al enviar el formulario:', error)
  }
}

const deleteProject = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este proyecto?')) {
    try {
      await axios.delete(`http://localhost:3000/api/projects/${id}`)
      fetchProjects()
      Swal.fire({
        icon: 'success',
        title: 'Proyecto eliminado',
        text: 'El proyecto se ha eliminado correctamente.',
        confirmButtonColor: '#81b29a'
      })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un problema al eliminar el proyecto.',
        confirmButtonColor: '#e63946'
      })
      console.error('Error al eliminar el proyecto:', error)
    }
  }
}

onMounted(fetchProjects)
</script>


<style scoped>
:root {
  --color-oscuro: #2f3e46;
  --color-principal: #354f52;
  --color-secundario: #81b29a;
  --color-claro: #eae7dc;
  --color-neutro: #d5bda5;
}

.admin-projects {
  padding: 2rem;
  background-color: var(--color-claro);
  color: var(--color-oscuro);
}

.projects-table {
  width: 100%;
  margin-top: 1rem;
  border-collapse: collapse;
}

.projects-table th,
.projects-table td {
  padding: 1rem;
  border: 1px solid var(--color-neutro);
}

.project-image {
  width: 100px;
  height: auto;
}
</style>

