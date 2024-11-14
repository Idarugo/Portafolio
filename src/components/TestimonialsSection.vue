<template>
  <section id="testimonios" class="testimonials-section">
    <h2>Testimonios</h2>
    <div v-if="testimonials.length" class="testimonials-container">
      <div v-for="testimonial in testimonials" :key="testimonial.id" class="testimonial-card">
        <p class="testimonial-text">
          <i class="fas fa-quote-left"></i>
          {{ testimonial.text }}
          <i class="fas fa-quote-right"></i>
        </p>
        <div class="testimonial-author">
          <img
            :src="testimonial.image || 'https://via.placeholder.com/80'"
            alt="Foto de {{ testimonial.name }}"
            class="author-photo"
          />
          <p class="author-name">{{ testimonial.name }}</p>
          <p class="author-role">{{ testimonial.position }}</p>
        </div>
      </div>
    </div>
    <p v-else class="no-testimonials">No hay testimonios disponibles en este momento.</p>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const testimonials = ref([]) // Array para almacenar testimonios

const fetchTestimonials = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/testimonios/aprobados')
    if (!response.ok) throw new Error('Error al obtener los testimonios')
    testimonials.value = await response.json() // Almacenar los datos en `testimonials`
  } catch (error) {
    console.error('Error:', error)
  }
}

// Llamar a `fetchTestimonials` cuando el componente se monte
onMounted(fetchTestimonials)
</script>

<style scoped>
.testimonials-section {
  padding: 4rem 2rem;
  background-color: #2f3e46;
  color: #eae7dc;
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #d5bda5;
}

.testimonials-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.testimonial-card {
  background-color: #354f52;
  color: #eae7dc;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  padding: 2rem;
  max-width: 400px;
  flex: 1 1 300px;
  text-align: left;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  position: relative;
}

.testimonial-text i {
  color: #d5bda5;
}

.testimonial-text i:first-of-type {
  margin-right: 0.5rem;
}

.testimonial-text i:last-of-type {
  margin-left: 0.5rem;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.author-photo {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.author-name {
  font-size: 1.2rem;
  font-weight: bold;
  color: #d5bda5;
}

.author-role {
  font-size: 0.9rem;
  color: #99a7a5;
}

.no-testimonials {
  color: #99a7a5;
  font-style: italic;
  margin-top: 2rem;
}
</style>
