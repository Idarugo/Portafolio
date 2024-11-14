import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import 'animate.css'

import App from './App.vue'
import router from './router'

// FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faUser, faEnvelope, faGlobe } from '@fortawesome/free-solid-svg-icons'

// SweetAlert2 (no se necesita configuración adicional)
import Swal from 'sweetalert2'

// Agregar íconos a la librería de FontAwesome
library.add(faUser, faEnvelope, faGlobe)

const app = createApp(App)

axios.defaults.baseURL = 'https://localhost:3000'

// Axios (puedes configurar instancias aquí si lo deseas)
import axios from 'axios'

// Ejemplo de configuración global de Axios si lo necesitas
axios.defaults.baseURL = 'https://api.example.com' // Cambia a tu API real
axios.defaults.headers.common['Authorization'] = 'Bearer token' // Si necesitas autenticación

// GSAP (puedes usar GSAP directamente en tus componentes cuando lo necesites)
import { gsap } from 'gsap'

// Configuraciones de Vue
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(createPinia())
app.use(router)

app.mount('#app')
