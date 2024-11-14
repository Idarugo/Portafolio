<template>
  <section id="contacto" class="contact-section">
    <h2>Contacto</h2>
    <div class="contact-container">
      <!-- Formulario -->
      <form @submit.prevent="submitForm" class="contact-form">
        <div class="form-group">
          <label for="name">Nombre</label>
          <input
            type="text"
            id="name"
            v-model="form.name"
            placeholder="Tu nombre completo"
            required
          />
        </div>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            placeholder="Tu correo electrónico"
            required
          />
        </div>
        <div class="form-group">
          <label for="message">Mensaje</label>
          <textarea
            id="message"
            v-model="form.message"
            placeholder="Escribe tu mensaje aquí"
            rows="5"
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Enviar Mensaje</button>
      </form>

      <!-- Información de contacto -->
      <div class="contact-info">
        <h3>Detalles de Contacto</h3>
        <p>¿Tienes preguntas o deseas trabajar conmigo? ¡No dudes en escribirme!</p>
        <ul>
          <li>
            <i class="fas fa-envelope"></i>
            <a href="mailto:correo@ejemplo.com">correo@ejemplo.com</a>
          </li>
          <li>
            <i class="fas fa-phone"></i>
            <a href="tel:+1234567890">+123 456 7890</a>
          </li>
          <li>
            <i class="fas fa-map-marker-alt"></i>
            Rancagua, Chile
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'

const form = ref({
  name: '',
  email: '',
  message: ''
})

const submitForm = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/contacto', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        nombre: form.value.name,
        correo: form.value.email,
        mensaje: form.value.message
      })
    })

    if (!response.ok) throw new Error('Error al enviar el mensaje de contacto.')

    // Mostrar mensaje de éxito
    Swal.fire({
      icon: 'success',
      title: '¡Mensaje enviado!',
      text: `Gracias por contactarme, ${form.value.name}. ¡Responderé pronto!`,
      confirmButtonColor: '#4caf50'
    })

    // Limpiar formulario
    form.value.name = ''
    form.value.email = ''
    form.value.message = ''
  } catch (error) {
    console.error('Error al enviar el mensaje de contacto:', error)

    // Mostrar mensaje de error
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'Hubo un problema al enviar el mensaje. Por favor, inténtalo de nuevo.',
      confirmButtonColor: '#f44336'
    })
  }
}
</script>

<style scoped>
.contact-section {
  padding: 4rem 2rem;
  background-color: #2f3e46; /* Fondo verde oscuro */
  color: #eae7dc; /* Texto beige claro */
  margin-bottom: 2rem;
}

h2 {
  text-align: center;
  font-size: 2.5rem;
  margin-bottom: 3rem;
  color: #d5bda5; /* Bronceado claro */
}

.contact-container {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  align-items: flex-start;
}

.contact-form,
.contact-info {
  background-color: #354f52; /* Verde más oscuro */
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  color: #eae7dc; /* Beige claro */
  max-width: 400px;
  flex: 1 1 300px;
}

.contact-form .form-group {
  margin-bottom: 1.5rem;
}

.contact-form label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #d5bda5; /* Bronceado claro */
}

.contact-form input,
.contact-form textarea {
  width: 100%;
  padding: 0.8rem;
  border: 1px solid #99a7a5; /* Verde claro grisáceo */
  border-radius: 5px;
  background-color: #2f3e46; /* Fondo verde oscuro */
  color: #eae7dc; /* Texto beige claro */
  font-size: 1rem;
}

.contact-form input::placeholder,
.contact-form textarea::placeholder {
  color: #99a7a5; /* Verde claro grisáceo */
}

.contact-form input:focus,
.contact-form textarea:focus {
  outline: none;
  border-color: #d5bda5; /* Bronceado claro */
  box-shadow: 0 0 5px #d5bda5;
}

.contact-form button {
  width: 100%;
  padding: 1rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  background-color: #d5bda5; /* Bronceado claro */
  color: #2f3e46; /* Verde oscuro */
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.contact-form button:hover {
  background-color: #a88f78; /* Bronceado más oscuro */
  transform: scale(1.05);
}

.contact-info h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #d5bda5; /* Bronceado claro */
}

.contact-info ul {
  list-style: none;
  padding: 0;
}

.contact-info ul li {
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.contact-info ul li i {
  color: #d5bda5; /* Bronceado claro */
  font-size: 1.2rem;
}

.contact-info ul li a {
  color: #eae7dc; /* Beige claro */
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-info ul li a:hover {
  color: #d5bda5; /* Bronceado claro */
}
</style>
