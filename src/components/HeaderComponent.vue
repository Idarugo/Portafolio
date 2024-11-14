<template>
  <header :class="{ sticky: isSticky }" class="header">
    <nav class="nav">
      <!-- Logo -->
      <div class="logo">
        <a href="#home">Marcelo Hidalgo</a>
      </div>

      <!-- Menú de navegación -->
      <ul class="nav-links">
        <li v-for="(section, index) in sections" :key="index" class="nav-item">
          <a :href="`#${section.toLowerCase()}`" @click="toggleMenu(false)">
            {{ section }}
          </a>
        </li>
      </ul>

      <!-- Botón de menú hamburguesa -->
      <button class="hamburger" @click="toggleMenu">
        <span class="line"></span>
        <span class="line"></span>
        <span class="line"></span>
      </button>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const sections = [
  'Inicio',
  'Sobre Mí',
  'Proyectos',
  'Habilidades',
  'Experiencia',
  'Testimonios',
  'Contacto'
]
const showMenu = ref(false)
const isSticky = ref(false)

const toggleMenu = (forceClose = null) => {
  showMenu.value = forceClose !== null ? forceClose : !showMenu.value
}

const handleScroll = () => {
  isSticky.value = window.scrollY > 50
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 86.7%;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
  z-index: 1000;
  transition: background-color 0.3s ease;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.header.sticky {
  background-color: #354f52; /* Verde intermedio */
}

.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 1rem; /* Reduce el padding */
  max-width: 100%; /* Asegura que ocupe todo el ancho */
  box-sizing: border-box; /* Considera el padding en el ancho total */
}

.logo a {
  font-size: 1.5rem;
  font-weight: bold;
  color: #d5bda5; /* Bronceado claro */
  text-decoration: none;
}

.nav-links {
  display: flex;
  gap: 1.5rem; /* Reduce el espacio entre enlaces */
  list-style: none; /* Elimina puntos */
  padding: 0;
  margin: 0;
}

.nav-item a {
  color: #eae7dc; /* Beige claro */
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
  padding: 0.5rem 1rem; /* Espaciado interno */
}

.nav-item a:hover {
  color: #d5bda5; /* Bronceado claro */
}

.hamburger {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 25px;
  height: 20px;
  background: none;
  border: none;
  cursor: pointer;
}

.hamburger .line {
  width: 100%;
  height: 3px;
  background-color: #eae7dc; /* Beige claro */
  border-radius: 3px;
  transition: transform 0.3s ease;
}

/* Responsive para pantallas más pequeñas */
@media (max-width: 768px) {
  .nav-links {
    display: none; /* Oculta en dispositivos móviles */
    flex-direction: column;
    align-items: flex-start;
  }

  .hamburger {
    display: flex;
  }

  .nav-links.show {
    display: flex; /* Muestra el menú al hacer clic */
    position: absolute;
    top: 60px; /* Ajusta para que quede debajo del header */
    left: 0;
    width: 100%;
    background-color: #2f3e46; /* Fondo igual al header */
    padding: 1rem;
    z-index: 1000;
  }

  .nav-item a {
    padding: 0.8rem 0; /* Más espaciado entre opciones */
    width: 100%;
    text-align: left; /* Alinea texto a la izquierda */
  }
}
</style>
