<template>
  <section id="experiencia" class="experience-section">
    <h2>Experiencia Laboral</h2>
    <div class="timeline">
      <div
        v-for="(job, index) in experience"
        :key="index"
        :class="['timeline-item', index % 2 === 0 ? 'left' : 'right']"
      >
        <div class="timeline-content">
          <h3>{{ job.title }}</h3>
          <h4>{{ job.company }}</h4>
          <p class="timeline-period">{{ job.period }}</p>
          <ul>
            <li v-for="(responsibility, rIndex) in job.responsibilities" :key="rIndex">
              {{ responsibility }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const experience = ref([
  {
    title: 'Desarrollador Full-Stack',
    company: 'Supermercado Cugat',
    period: 'Junio 2017 - Presente',
    responsibilities: [
      'Desarrollo y mantenimiento de sistemas internos, como gestión de mermas (Merma-Cugat) y SATOS.',
      'Implementación de un sistema de vales para el casino de trabajadores con escaneo de credenciales y control por horario.',
      'Colaboración con equipos multidisciplinarios para optimizar procesos empresariales mediante tecnología.',
      'Automatización de tareas administrativas para mejorar la eficiencia operativa.'
    ]
  },
  {
    title: 'Desarrollador Full-Stack',
    company: 'Freelance',
    period: 'Enero 2020 - Presente',
    responsibilities: [
      'Desarrollo de aplicaciones web personalizadas, como Animeflix y PlanPro.',
      'Diseño y ejecución de sistemas para negocios locales, incluyendo veterinarias y centros médicos.',
      'Gestión integral de proyectos, desde la planificación hasta la entrega final.',
      'Colaboración con clientes para identificar necesidades y desarrollar soluciones efectivas.'
    ]
  },
  {
    title: 'Desarrollador Web',
    company: 'Centro Audiológico Rancagua',
    period: 'Enero 2019 - Junio 2019',
    responsibilities: [
      'Diseño e implementación de un sistema de gestión de turnos y reservas con clasificación por tipo de turno.',
      'Optimización de procesos administrativos para empleados y pacientes.',
      'Creación de interfaces intuitivas que mejoraron la experiencia del usuario.'
    ]
  },
  {
    title: 'Desarrollador Web',
    company: 'Portal Veterinaria',
    period: 'Agosto 2018 - Diciembre 2018',
    responsibilities: [
      'Desarrollo de un sistema para registrar clientes, mascotas y gestionar citas.',
      'Creación de un panel administrativo para facilitar la gestión interna.',
      'Optimización de la experiencia de usuario mediante interfaces modernas.'
    ]
  },
  {
    title: 'Desarrollador Front-End',
    company: 'StrongGym',
    period: 'Octubre 2023 - Presente',
    responsibilities: [
      'Desarrollo de una plataforma web para la gestión de gimnasios utilizando CSS y JavaScript.',
      'Optimización del diseño para una experiencia de usuario fluida y moderna.',
      'Implementación de funcionalidades clave como reservas de clases y estadísticas de rendimiento.'
    ]
  }
])
</script>

<style scoped>
.experience-section {
  padding: 4rem 2rem;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d5bda5; /* Bronceado claro */
}

.timeline {
  position: relative;
  margin: 0 auto;
  max-width: 800px;
}

.timeline::after {
  content: '';
  position: absolute;
  width: 4px;
  background-color: #526760; /* Verde neutro */
  top: 0;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}

.timeline-item {
  position: relative;
  width: 50%;
  padding: 1.5rem 2rem;
}

.timeline-item.left {
  left: 0;
  text-align: right;
}

.timeline-item.right {
  left: 50%;
  text-align: left;
}

.timeline-content {
  background-color: #354f52; /* Verde más oscuro */
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  position: relative;
  color: #eae7dc; /* Beige claro */
}

.timeline-content h3 {
  font-size: 1.5rem;
  color: #d5bda5; /* Bronceado claro */
}

.timeline-content h4 {
  font-size: 1.2rem;
  color: #eae7dc; /* Beige claro */
}

.timeline-content::after {
  content: '';
  position: absolute;
  width: 12px;
  height: 12px;
  background-color: #d5bda5; /* Bronceado claro */
  border-radius: 50%;
  top: 20px;
}

.timeline-item.left .timeline-content::after {
  right: -6px;
}

.timeline-item.right .timeline-content::after {
  left: -6px;
}

.timeline-period {
  font-size: 0.9rem;
  color: #99a7a5; /* Verde claro grisáceo */
  margin-bottom: 1rem;
}

ul {
  padding-left: 1.5rem;
}

ul li {
  margin-bottom: 0.5rem;
  list-style: disc;
  color: #eae7dc; /* Beige claro */
}
</style>
