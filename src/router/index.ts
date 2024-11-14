import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TestimonialFormView from '../views/TestimonialFormView.vue'
import LoginView from '../views/LoginView.vue'
import AdminLayout from '../components/AdminLayout.vue' // Nuevo layout para el área de administración
import AdminTestimonials from '../views/AdminTestimonials.vue'
import GenerateTokenView from '../views/GenerateTokenView.vue'
import AdminContactsView from '../views/AdminContactsView.vue'
import AdminProjectsView from '../views/AdminProjectsView.vue'

// Función para verificar si el usuario está autenticado
const isAuthenticated = () => {
  return !!localStorage.getItem('token') // Comprueba si hay un token en localStorage
}

// Configuración de las rutas
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/testimonios',
    name: 'testimonios',
    component: TestimonialFormView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView
  },
  {
    path: '/admin',
    component: AdminLayout,
    meta: { requiresAuth: true }, // Protegemos el layout completo
    children: [
      {
        path: '',
        redirect: '/admin/testimonios' // Redirige a testimonios por defecto
      },
      {
        path: 'testimonios',
        name: 'admin-testimonios',
        component: AdminTestimonials
      },
      {
        path: 'generar-token',
        name: 'GenerateToken',
        component: GenerateTokenView
      },
      {
        path: 'contactos',
        name: 'AdminContacts',
        component: AdminContactsView
      },
      {
        path: 'proyectos',
        name: 'AdminProjects',
        component: AdminProjectsView
      }
    ]
  }
]

// Crear el router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Middleware global para proteger rutas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
    // Si la ruta requiere autenticación y no hay un token, redirige al login
    next({ name: 'login' })
  } else {
    next() // Permite el acceso si está autenticado o si la ruta no requiere autenticación
  }
})

export default router
