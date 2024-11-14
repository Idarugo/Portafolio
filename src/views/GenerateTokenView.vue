<template>
  <div class="generate-token">
    <h1>Generar Token</h1>
    <form @submit.prevent="generateToken">
      <div class="form-group">
        <label for="email">Correo del Cliente</label>
        <input
          id="email"
          v-model="email"
          type="email"
          placeholder="Ingrese el correo del cliente"
          required
        />
      </div>
      <button type="submit" class="btn">Generar Token</button>
    </form>

    <div v-if="generatedToken" class="token-result">
      <p><strong>Token generado:</strong></p>
      <textarea class="token-display" :value="generatedToken" readonly></textarea>
      <button @click="copyTokenToClipboard" class="btn-copy">Copiar Token</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

// Variables reactivas
const email = ref('')
const generatedToken = ref('')

// Función para generar un token y enviarlo por correo
const generateToken = async () => {
  try {
    // Mostrar SweetAlert2 de carga
    const loadingAlert = Swal.fire({
      title: 'Generando Token...',
      text: 'Por favor espera mientras se envía el correo.',
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => {
        Swal.showLoading() // Mostrar spinner de carga
      }
    })

    // Llamada al backend para generar el token
    const response = await fetch('http://localhost:3000/api/auth/generate-token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email.value })
    })

    if (!response.ok) throw new Error('Error al generar el token')

    const { token, message } = await response.json()
    generatedToken.value = token

    // Cerrar el SweetAlert2 de carga
    Swal.close()

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Token generado con éxito!',
      text: message || 'El token se ha enviado al correo proporcionado.',
      confirmButtonColor: 'var(--color-principal)'
    })
  } catch (error) {
    // Cerrar el SweetAlert2 de carga en caso de error
    Swal.close()

    console.error('Error al generar el token:', error)
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo generar el token. Asegúrate de que el correo es válido y que el servidor esté funcionando.',
      confirmButtonColor: 'var(--color-secundario)'
    })
  }
}

// Función para copiar el token al portapapeles
const copyTokenToClipboard = () => {
  navigator.clipboard
    .writeText(generatedToken.value)
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: '¡Token copiado al portapapeles!',
        confirmButtonColor: 'var(--color-principal)'
      })
    })
    .catch((err) => {
      console.error('Error al copiar el token:', err)
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'No se pudo copiar el token al portapapeles.',
        confirmButtonColor: 'var(--color-secundario)'
      })
    })
}
</script>

<style scoped>
:root {
  --color-oscuro: #354f52;
  --color-principal: #52796f;
  --color-secundario: #84a98c;
  --color-claro: #cad2c5;
  --color-neutro: #e5e5e5;
}

.generate-token {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: var(--color-claro);
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-size: 1.8rem;
  color: var(--color-oscuro);
  margin-bottom: 1.5rem;
  text-align: center;
}

.form-group {
  margin-bottom: 1.5rem;
}

label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: var(--color-principal);
}

input {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-secundario);
  border-radius: 4px;
  font-size: 1rem;
  background-color: white;
}

input:focus {
  border-color: var(--color-principal);
  outline: none;
  box-shadow: 0 0 5px var(--color-principal);
}

button {
  padding: 0.8rem 1.5rem;
  background-color: var(--color-principal);
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--color-secundario);
}

.token-result {
  margin-top: 1.5rem;
  padding: 1rem;
  background-color: var(--color-neutro);
  border-radius: 4px;
}

textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid var(--color-secundario);
  border-radius: 4px;
  font-size: 1rem;
  resize: none;
  background-color: var(--color-claro);
  color: var(--color-oscuro);
}

textarea:focus {
  border-color: var(--color-principal);
  outline: none;
  box-shadow: 0 0 5px var(--color-principal);
}

.btn-copy {
  margin-top: 0.5rem;
  background-color: var(--color-secundario);
  color: white;
}

.btn-copy:hover {
  background-color: var(--color-principal);
}
</style>
