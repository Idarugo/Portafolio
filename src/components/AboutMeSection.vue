<template>
  <section id="sobre-mi" class="about-section">
    <h2>Sobre Mí</h2>
    <div class="about-container">
      <!-- Imagen -->
      <div class="about-photo">
        <img
          src="../assets/img/perfil.png"
          alt="Foto profesional de Marcelo Hidalgo"
          class="profile-photo"
        />
      </div>

      <!-- Información -->
      <div class="about-info">
        <p>
          Soy <strong>Marcelo Hidalgo</strong>, un desarrollador <strong>Full-Stack</strong> con más
          de <strong>5 años de experiencia</strong> en desarrollo web. Me especializo en
          <strong>Vue.js</strong>, <strong>Node.js</strong>, y <strong>PHP</strong>, creando
          soluciones innovadoras para negocios locales e internacionales.
        </p>
        <p>
          He trabajado en proyectos empresariales, como <strong>Merma-Cugat</strong> y
          <strong>Animeflix</strong>, ayudando a optimizar procesos internos y a mejorar la
          experiencia del usuario.
        </p>
        <ul>
          <li>
            <strong>Pasión por el aprendizaje:</strong> Siempre estoy aprendiendo nuevas tecnologías
            y enfoques para ofrecer soluciones modernas.
          </li>
          <li>
            <strong>Colaboración:</strong> Trabajo estrechamente con equipos y clientes para
            alcanzar objetivos ambiciosos.
          </li>
        </ul>
        <a href="#contacto" class="btn">Contáctame</a>
      </div>
    </div>
  </section>
</template>

<script setup>
// Puedes agregar cualquier lógica o props si es necesario
</script>

<style scoped>
.about-section {
  padding: 4rem 2rem;
  background-color: #354f52; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
  text-align: center;
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #d5bda5; /* Bronceado claro */
  text-transform: uppercase;
  letter-spacing: 1.5px;
}

.about-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
}

.about-photo {
  flex: 1;
  max-width: 300px;
}

.profile-photo {
  width: 100%;
  height: auto;
  border-radius: 50%;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.profile-photo:hover {
  transform: scale(1.05);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
}

.about-info {
  flex: 2;
  text-align: left;
  font-size: 1.1rem;
  line-height: 1.8;
  color: #d5bda5; /* Bronceado claro */
}

.about-info strong {
  color: #eae7dc; /* Beige claro */
}

.about-info ul {
  margin-top: 1.5rem;
  padding-left: 1.5rem;
  list-style-type: disc;
}

.about-info ul li {
  margin-bottom: 1rem;
}

.btn {
  display: inline-block;
  margin-top: 1.5rem;
  padding: 0.8rem 2rem;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
  text-decoration: none;
  border-radius: 5px;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

.btn:hover {
  background-color: #d5bda5; /* Bronceado claro */
  color: #2f3e46; /* Verde oscuro */
  transform: scale(1.05);
}

@media (max-width: 768px) {
  .about-container {
    flex-direction: column;
  }

  .about-photo {
    max-width: 200px;
  }

  .about-info {
    text-align: center;
    padding: 0 1rem;
  }
}
</style>
