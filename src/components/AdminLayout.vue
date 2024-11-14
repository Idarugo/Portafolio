<template>
  <div class="admin-layout">
    <aside :class="['sidebar', { collapsed }]">
      <button class="toggle-btn" @click="toggleSidebar">
        <span v-if="!collapsed">⇐</span>
        <span v-else>⇒</span>
      </button>
      <nav>
        <ul>
          <li>
            <router-link to="/admin/testimonios">
              <span v-if="!collapsed">Testimonios</span>
              <i v-else class="fas fa-comments"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/contactos">
              <span v-if="!collapsed">Contactos</span>
              <i v-else class="fas fa-envelope"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/admin/proyectos">
              <span v-if="!collapsed">Proyectos</span>
              <i v-else class="fas fa-project-diagram"></i>
            </router-link>
          </li>
        </ul>
      </nav>
      <button @click="logout" class="logout-btn">
        <span v-if="!collapsed">Cerrar Sesión</span>
        <i v-else class="fas fa-sign-out-alt"></i>
      </button>
    </aside>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const collapsed = ref(false)
const router = useRouter()

const toggleSidebar = () => {
  collapsed.value = !collapsed.value
}

const logout = async () => {
  const result = await Swal.fire({
    title: '¿Cerrar sesión?',
    text: 'Tu sesión será cerrada.',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'Cancelar'
  })

  if (result.isConfirmed) {
    localStorage.removeItem('token')
    await Swal.fire('Sesión cerrada', 'Has salido exitosamente.', 'success')
    router.push('/login')
  }
}
</script>

<style scoped>
.admin-layout {
  display: flex;
  min-height: 100vh;
}

.sidebar {
  width: 250px;
  background-color: #354f52;
  color: white;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  transition: width 0.3s ease;
}

.sidebar.collapsed {
  width: 80px;
}

.sidebar nav ul {
  list-style: none;
  padding: 0;
}

.sidebar nav ul li {
  margin-bottom: 1rem;
}

.sidebar nav ul li a {
  text-decoration: none;
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
}

.sidebar nav ul li a:hover {
  color: #7fd3ed;
}

.logout-btn {
  margin-top: auto;
  padding: 0.5rem;
  background-color: #d90429;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.logout-btn:hover {
  background-color: #ff616d;
}

.content {
  flex-grow: 1;
  padding: 2rem;
  background-color: #f4f4f4;
}

.toggle-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.toggle-btn:hover {
  color: #7fd3ed;
}
</style>
