 <template>
  <div class="admin-testimonials">
    <h1>Administrar Testimonios</h1>

    <!-- Sección de testimonios pendientes -->
    <h2>Pendientes</h2>
    <div v-if="pendingTestimonials.length" class="testimonials-list">
      <div
        v-for="testimonial in pendingTestimonials"
        :key="testimonial.id"
        class="testimonial-item"
      >
        <p><strong>Nombre:</strong> {{ testimonial.name }}</p>
        <p><strong>Cargo:</strong> {{ testimonial.position }}</p>
        <p><strong>Testimonio:</strong> {{ testimonial.text }}</p>
        <img
          :src="testimonial.image || 'https://via.placeholder.com/80'"
          alt="Foto de {{ testimonial.name }}"
          class="testimonial-image"
        />
        <div class="actions">
          <button @click="updateTestimonialStatus(testimonial.id, true)">Aprobar</button>
          <button @click="updateTestimonialStatus(testimonial.id, false)">Rechazar</button>
        </div>
      </div>
    </div>
    <p v-else>No hay testimonios pendientes.</p>

    <!-- Sección de testimonios aprobados -->
    <h2>Aprobados</h2>
    <div v-if="approvedTestimonials.length" class="testimonials-list">
      <div
        v-for="testimonial in approvedTestimonials"
        :key="testimonial.id"
        class="testimonial-item"
      >
        <p><strong>Nombre:</strong> {{ testimonial.name }}</p>
        <p><strong>Cargo:</strong> {{ testimonial.position }}</p>
        <p><strong>Testimonio:</strong> {{ testimonial.text }}</p>
        <img
          :src="testimonial.image || 'https://via.placeholder.com/80'"
          alt="Foto de {{ testimonial.name }}"
          class="testimonial-image"
        />
        <div class="actions">
          <button @click="updateTestimonialStatus(testimonial.id, false)">Rechazar</button>
          <button @click="deleteTestimonial(testimonial.id)">Eliminar</button>
        </div>
      </div>
    </div>
    <p v-else>No hay testimonios aprobados.</p>

    <!-- Sección de testimonios rechazados -->
    <h2>Rechazados</h2>
    <div v-if="rejectedTestimonials.length" class="testimonials-list">
      <div
        v-for="testimonial in rejectedTestimonials"
        :key="testimonial.id"
        class="testimonial-item"
      >
        <p><strong>Nombre:</strong> {{ testimonial.name }}</p>
        <p><strong>Cargo:</strong> {{ testimonial.position }}</p>
        <p><strong>Testimonio:</strong> {{ testimonial.text }}</p>
        <img
          :src="testimonial.image || 'https://via.placeholder.com/80'"
          alt="Foto de {{ testimonial.name }}"
          class="testimonial-image"
        />
        <div class="actions">
          <button @click="updateTestimonialStatus(testimonial.id, true)">Aprobar</button>
          <button @click="deleteTestimonial(testimonial.id)">Eliminar</button>
        </div>
      </div>
    </div>
    <p v-else>No hay testimonios rechazados.</p>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Swal from 'sweetalert2'

const pendingTestimonials = ref([]) // Testimonios pendientes
const approvedTestimonials = ref([]) // Testimonios aprobados
const rejectedTestimonials = ref([]) // Testimonios rechazados

// Función para cargar todos los testimonios
const fetchTestimonials = async () => {
  try {
    const [pendingResponse, approvedResponse, rejectedResponse] = await Promise.all([
      fetch('http://localhost:3000/api/testimonios/pendientes'),
      fetch('http://localhost:3000/api/testimonios/aprobados'),
      fetch('http://localhost:3000/api/testimonios/rechazados')
    ])

    if (!pendingResponse.ok || !approvedResponse.ok || !rejectedResponse.ok) {
      throw new Error('Error al cargar los testimonios')
    }

    pendingTestimonials.value = await pendingResponse.json()
    approvedTestimonials.value = await approvedResponse.json()
    rejectedTestimonials.value = await rejectedResponse.json()
  } catch (error) {
    console.error('Error al cargar los testimonios:', error)
  }
}

// Función para actualizar el estado de un testimonio
const updateTestimonialStatus = async (id, approved) => {
  try {
    const response = await fetch(`http://localhost:3000/api/testimonios/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ approved })
    })

    if (!response.ok) throw new Error('Error al actualizar el testimonio')

    Swal.fire({
      icon: 'success',
      title: `Testimonio ${approved ? 'aprobado' : 'rechazado'} con éxito.`,
      confirmButtonColor: '#4caf50'
    })

    // Recargar datos después de actualizar
    await fetchTestimonials()
  } catch (error) {
    console.error('Error al actualizar el testimonio:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo actualizar el testimonio. Intenta de nuevo.',
      confirmButtonColor: '#f44336'
    })
  }
}

// Función para eliminar un testimonio
const deleteTestimonial = async (id) => {
  const result = await Swal.fire({
    title: '¿Estás seguro?',
    text: 'Esta acción eliminará el testimonio permanentemente.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    try {
      const response = await fetch(`http://localhost:3000/api/testimonios/${id}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Error al eliminar el testimonio')

      Swal.fire({
        icon: 'success',
        title: 'Testimonio eliminado con éxito.',
        confirmButtonColor: '#4caf50'
      })

      // Recargar datos después de eliminar
      await fetchTestimonials()
    } catch (error) {
      console.error('Error al eliminar el testimonio:', error)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo eliminar el testimonio. Intenta de nuevo.',
        confirmButtonColor: '#f44336'
      })
    }
  }
}

onMounted(fetchTestimonials)
</script>


  <style scoped>
.admin-testimonials {
  max-width: 800px;
  margin: 2rem auto;
}

.testimonials-list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.testimonial-item {
  background-color: #354f52;
  color: #eae7dc;
  padding: 1rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.testimonial-image {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  margin-top: 0.5rem;
}

.actions {
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  color: white;
}

button:first-of-type {
  background-color: #4caf50; /* Verde */
}

button:last-of-type {
  background-color: #f44336; /* Rojo */
}
</style>
  