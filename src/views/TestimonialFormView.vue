<template>
  <div>
    <div class="testimonial-form" v-if="isValidToken && !isSubmitted">
      <h1>Deja tu Testimonio</h1>
      <form @submit.prevent="submitTestimonial" enctype="multipart/form-data">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            id="name"
            v-model="testimonial.name"
            type="text"
            placeholder="Tu nombre"
            required
          />
        </div>
        <div class="form-group">
          <label for="position">Posición o Cargo</label>
          <input
            id="position"
            v-model="testimonial.position"
            type="text"
            placeholder="Tu cargo (opcional)"
          />
        </div>
        <div class="form-group">
          <label for="text">Testimonio</label>
          <textarea
            id="text"
            v-model="testimonial.text"
            rows="5"
            placeholder="Escribe tu testimonio"
            required
          ></textarea>
        </div>
        <div class="form-group">
          <label for="image">Foto</label>
          <input id="image" type="file" @change="handleFileUpload" accept="image/*" />
          <div v-if="previewImage" class="image-preview">
            <img :src="previewImage" alt="Previsualización de la imagen" class="avatar" />
          </div>
        </div>
        <button type="submit" class="btn">Enviar</button>
      </form>
    </div>

    <div v-else-if="isSubmitted" class="success-message">
      <h1>¡Gracias por tu Testimonio!</h1>
      <p>Ya hemos recibido tu testimonio. No es necesario enviar otro.</p>
    </div>

    <div v-else class="invalid-token">
      <h1>Token Inválido</h1>
      <p>El enlace que usaste es inválido o ha expirado.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Swal from 'sweetalert2'

const route = useRoute() // Captura los parámetros de la URL
const token = ref(route.query.token || '') // Captura el token de la URL
const isValidToken = ref(false)
const isSubmitted = ref(false) // Estado para controlar si el testimonio ya fue enviado

const testimonial = ref({
  name: '',
  position: '',
  text: '',
  image: null,
  token: token.value
})

const previewImage = ref(null)

// Verificar si el token es válido al cargar el componente
onMounted(async () => {
  try {
    const response = await fetch('http://localhost:3000/api/auth/verify-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: token.value })
    })

    const { valid } = await response.json()
    isValidToken.value = valid

    if (!valid) {
      Swal.fire({
        icon: 'error',
        title: 'Token Inválido',
        text: 'El enlace que usaste es inválido o ha expirado.',
        confirmButtonColor: '#f44336'
      })
    }
  } catch (err) {
    console.error('Error al verificar el token:', err)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al verificar el token.',
      confirmButtonColor: '#f44336'
    })
  }
})

// Manejar carga de imágenes
const handleFileUpload = (event) => {
  const file = event.target.files[0]
  testimonial.value.image = file
  if (file) {
    const reader = new FileReader()
    reader.onload = () => {
      previewImage.value = reader.result
    }
    reader.readAsDataURL(file)
  }
}

// Enviar el testimonio al servidor
const submitTestimonial = async () => {
  try {
    const formData = new FormData()
    formData.append('name', testimonial.value.name)
    formData.append('position', testimonial.value.position)
    formData.append('text', testimonial.value.text)
    formData.append('token', testimonial.value.token)
    if (testimonial.value.image) {
      formData.append('image', testimonial.value.image)
    }

    const response = await fetch('http://localhost:3000/api/testimonios', {
      method: 'POST',
      body: formData
    })

    if (!response.ok) throw new Error('Error al enviar el testimonio')

    isSubmitted.value = true // Marcar como enviado

    Swal.fire({
      icon: 'success',
      title: '¡Testimonio enviado con éxito!',
      text: 'Gracias por tu testimonio, será revisado pronto.',
      confirmButtonColor: '#4caf50'
    })

    // Reiniciar formulario y previsualización
    testimonial.value.name = ''
    testimonial.value.position = ''
    testimonial.value.text = ''
    testimonial.value.image = null
    previewImage.value = null
  } catch (error) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Ocurrió un error al enviar el testimonio. Intenta de nuevo.',
      confirmButtonColor: '#f44336'
    })
  }
}
</script>

<style scoped>
:root {
  --color-oscuro: #2d3e45;
  --color-principal: #4c838b;
  --color-secundario: #7fbfd1;
  --color-claro: #d0e3e7;
  --color-neutro: #e6dfd6;
}

.testimonial-form,
.invalid-token,
.success-message {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-neutro);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

h1 {
  font-size: 1.8rem;
  color: var(--color-principal);
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
  text-align: left;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--color-oscuro);
}

input,
textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-claro);
  border-radius: 4px;
  background-color: white;
  font-size: 1rem;
  color: var(--color-oscuro);
  outline: none;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

input:focus,
textarea:focus {
  border-color: var(--color-principal);
  box-shadow: 0 0 5px var(--color-principal);
}

button {
  width: 100%;
  padding: 0.8rem 1.5rem;
  background-color: var(--color-principal);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--color-secundario);
}

.image-preview {
  margin-top: 1rem;
  text-align: center;
}

.avatar {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 3px solid var(--color-principal);
}
</style>
