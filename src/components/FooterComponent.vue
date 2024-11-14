<template>
  <footer class="footer">
    <div class="footer-content">
      <div class="footer-logo">
        <h2>Marcelo Hidalgo</h2>
        <p>Desarrollador Full-Stack</p>
      </div>
      <div class="footer-links">
        <h3>Enlaces</h3>
        <ul>
          <li><a href="#inicio">Inicio</a></li>
          <li><a href="#sobre-mi">Sobre Mí</a></li>
          <li><a href="#proyectos">Proyectos</a></li>
          <li><a href="#habilidades">Habilidades</a></li>
          <li><a href="#experiencia">Experiencia</a></li>
          <li><a href="#contacto">Contacto</a></li>
        </ul>
      </div>
      <div class="footer-social">
        <h3>Redes Sociales</h3>
        <div class="social-icons">
          <a href="https://github.com/Idarugo" target="_blank" aria-label="GitHub">
            <i class="fab fa-github"></i>
          </a>
          <a
            href="https://www.linkedin.com/in/marcelo-hidalgo-pinto-4848541b6"
            target="_blank"
            aria-label="LinkedIn"
          >
            <i class="fab fa-linkedin"></i>
          </a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2024 Marcelo Hidalgo. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding-top: 2rem;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
  padding: 2rem 1rem;
}

.footer-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-logo h2 {
  color: #d5bda5; /* Bronceado claro */
  font-size: 1.8rem;
  margin-bottom: 0.5rem;
}

.footer-logo p {
  font-size: 1rem;
  color: #eae7dc; /* Beige claro */
}

.footer-links h3,
.footer-social h3 {
  color: #d5bda5; /* Bronceado claro */
  font-size: 1.2rem;
  margin-bottom: 1rem;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links ul li {
  margin-bottom: 0.5rem;
}

.footer-links ul li a {
  color: #eae7dc; /* Beige claro */
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links ul li a:hover {
  color: #d5bda5; /* Bronceado claro */
}

.footer-social .social-icons {
  display: flex;
  gap: 1rem;
}

.footer-social .social-icons a {
  color: #eae7dc; /* Beige claro */
  font-size: 1.5rem;
  transition: color 0.3s ease, transform 0.3s ease;
}

.footer-social .social-icons a:hover {
  color: #d5bda5; /* Bronceado claro */
  transform: scale(1.2);
}

.footer-bottom {
  text-align: center;
  margin-top: 2rem;
  border-top: 1px solid #99a7a5; /* Verde claro grisáceo */
  padding-top: 1rem;
  font-size: 0.9rem;
  color: #99a7a5; /* Verde claro grisáceo */
}

@media (max-width: 768px) {
  .footer-content {
    flex-direction: column;
    text-align: center;
    align-items: center;
  }

  .footer-links ul {
    text-align: center;
  }
}
</style>
