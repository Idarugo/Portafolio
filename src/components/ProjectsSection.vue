<template>
  <section id="proyectos" class="projects-section">
    <h2>Proyectos Destacados</h2>
    <div class="projects-container">
      <div v-for="(project, index) in projects" :key="index" class="project-card">
        <img
          :src="`http://localhost:3000/uploads/proyectos/${project.imagen}`"
          :alt="project.titulo"
          class="project-image"
        />
        <div class="project-info">
          <h3>{{ project.titulo }}</h3>
          <p>{{ project.descripcion }}</p>
          <!-- Mostrar todos los enlaces -->
          <div v-if="project.enlaces && project.enlaces.length">
            <a
              v-for="(link, linkIndex) in project.enlaces"
              :key="linkIndex"
              :href="link.url"
              class="btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ link.tipo_enlace }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const projects = ref([]) // Lista dinámica de proyectos

// Cargar proyectos al montar el componente
const fetchProjects = async () => {
  try {
    const { data } = await axios.get('http://localhost:3000/api/projects')
    projects.value = data
  } catch (error) {
    console.error('Error al cargar los proyectos:', error)
  }
}

// Montar y cargar los proyectos
onMounted(fetchProjects)
</script>

<style scoped>
.projects-section {
  padding: 4rem 2rem;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #d5bda5; /* Bronceado claro */
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.5px;
}

.projects-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.project-card {
  background-color: #354f52; /* Verde más oscuro */
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
}

.project-image {
  width: 100%;
  height: auto;
  display: block;
}

.project-info {
  padding: 1.5rem;
  text-align: left;
}

.project-info h3 {
  font-size: 1.5rem;
  color: #eae7dc; /* Beige claro */
  margin-bottom: 0.5rem;
}

.project-info p {
  font-size: 1rem;
  color: #d5bda5; /* Bronceado claro */
  line-height: 1.6;
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1.5rem;
  background-color: #526760; /* Verde neutro */
  color: #eae7dc; /* Beige claro */
  text-decoration: none;
  font-weight: bold;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #d5bda5; /* Bronceado claro */
  color: #2f3e46; /* Verde oscuro */
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .projects-container {
    grid-template-columns: 1fr;
  }
}
</style>
