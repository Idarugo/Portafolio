<template>
  <div class="login-container">
    <h2>Iniciar Sesión</h2>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <button type="submit" class="btn">Ingresar</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const email = ref('')
const password = ref('')
const router = useRouter()

const login = async () => {
  try {
    const response = await axios.post('http://localhost:3000/api/auth/login', {
      email: email.value,
      password: password.value
    })

    const { token } = response.data

    // Guardar el token en localStorage
    localStorage.setItem('token', token)

    // Mostrar un mensaje de éxito con SweetAlert2
    Swal.fire({
      title: '¡Inicio de sesión exitoso!',
      text: 'Redirigiendo al área de administración...',
      icon: 'success',
      timer: 2000,
      showConfirmButton: false
    })

    // Redirigir al área de administración
    setTimeout(() => {
      router.push('/admin')
    }, 2000)
  } catch (error) {
    console.error('Error al iniciar sesión:', error)

    // Manejar errores con SweetAlert2
    if (error.response?.status === 400) {
      Swal.fire({
        title: 'Error',
        text: 'Credenciales inválidas. Por favor, verifica tu email y contraseña.',
        icon: 'error',
        confirmButtonText: 'Intentar de nuevo'
      })
    } else {
      Swal.fire({
        title: 'Error',
        text: 'Error en el servidor. Inténtalo más tarde.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
      })
    }
  }
}
</script>

<style scoped>
/* Estilo simple para el formulario */
.login-container {
  max-width: 400px;
  margin: auto;
  padding: 1rem;
  background: #f4f4f4;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}
h2 {
  text-align: center;
  margin-bottom: 1rem;
}
.form-group {
  margin-bottom: 1rem;
}
label {
  display: block;
  margin-bottom: 0.5rem;
}
input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1rem;
}
button {
  width: 100%;
  padding: 0.5rem;
  background-color: #354f52;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}
button:hover {
  background-color: #526760;
}
</style>
