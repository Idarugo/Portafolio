<template>
  <section class="hero" id="inicio">
    <div class="hero-content">
      <h1>Hola, soy <span class="highlight">Marcelo Hidalgo</span></h1>
      <h2>Desarrollador Full-Stack</h2>
      <p>
        Creando soluciones innovadoras en <strong>Vue.js</strong>, <strong>Node.js</strong>, y más.
        ¡Descubre mis proyectos y trabajemos juntos!
      </p>
      <div class="cta-buttons">
        <a href="#proyectos" class="btn btn-primary">Ver Proyectos</a>
        <a href="#contacto" class="btn btn-secondary">Contactar</a>
      </div>
    </div>
  </section>
</template>
emplate>

<style scoped>
.hero {
  background-color: #2f3e46; /* Verde oscuro de la paleta */
  color: #eae7dc; /* Beige claro para texto */
  text-align: center;
  padding: 4rem 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.hero-content h1 {
  font-size: 2.8rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #eae7dc; /* Beige claro */
}

.hero-content .highlight {
  color: #d5bda5; /* Bronceado claro */
  background: rgba(47, 62, 70, 0.2); /* Transparente para resaltar */
  padding: 0.2rem 0.5rem;
  border-radius: 5px;
}

.hero-content h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
  font-weight: 600;
  color: #eae7dc; /* Beige claro */
}

.hero-content p {
  font-size: 1.2rem;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
}

.btn {
  padding: 0.8rem 1.5rem;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn-primary {
  background-color: #354f52; /* Verde más claro */
  color: #eae7dc; /* Beige claro */
}

.btn-primary:hover {
  background-color: #52796f; /* Hover verde más suave */
  transform: scale(1.05);
}

.btn-secondary {
  background-color: transparent;
  color: #eae7dc; /* Beige claro */
  border: 2px solid #eae7dc;
}

.btn-secondary:hover {
  background-color: #eae7dc; /* Beige claro */
  color: #2f3e46; /* Verde oscuro */
  transform: scale(1.05);
}
</style>