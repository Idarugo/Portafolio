<template>
  <section id="habilidades" class="skills-section">
    <h2>Habilidades Técnicas</h2>
    <div class="skills-container">
      <!-- Lenguajes -->
      <div class="skills-category">
        <h3>Lenguajes</h3>
        <ul>
          <li v-for="(skill, index) in skills.languages" :key="index">
            <span>{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Frameworks y Librerías -->
      <div class="skills-category">
        <h3>Frameworks & Librerías</h3>
        <ul>
          <li v-for="(skill, index) in skills.frameworks" :key="index">
            <span>{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
            </div>
          </li>
        </ul>
      </div>

      <!-- Herramientas y Plataformas -->
      <div class="skills-category">
        <h3>Herramientas & Plataformas</h3>
        <ul>
          <li v-for="(skill, index) in skills.tools" :key="index">
            <span>{{ skill.name }}</span>
            <div class="skill-bar">
              <div class="skill-level" :style="{ width: skill.level + '%' }"></div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
const skills = {
  languages: [
    { name: 'JavaScript', level: 90 },
    { name: 'PHP', level: 80 },
    { name: 'TypeScript', level: 75 },
    { name: 'SQL', level: 85 }
  ],
  frameworks: [
    { name: 'Vue.js', level: 90 },
    { name: 'Node.js', level: 85 },
    { name: 'Express.js', level: 75 },
    { name: 'Laravel', level: 70 },
    { name: 'React', level: 60 }
  ],
  tools: [
    { name: 'Git', level: 95 },
    { name: 'Docker', level: 70 },
    { name: 'AWS', level: 60 },
    { name: 'PHPMyAdmin', level: 85 }
  ]
}
</script>

<style scoped>
.skills-section {
  padding: 4rem 2rem;
  background-color: #2f3e46; /* Verde oscuro */
  color: #eae7dc; /* Beige claro */
}

h2 {
  font-size: 2.5rem;
  margin-bottom: 2rem;
  color: #d5bda5; /* Bronceado claro */
  text-transform: uppercase;
  text-align: center;
  letter-spacing: 1.5px;
}

.skills-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.skills-category {
  background-color: #354f52; /* Verde más oscuro */
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.skills-category h3 {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #eae7dc; /* Beige claro */
  text-align: center;
}

.skills-category ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.skills-category li {
  margin-bottom: 1rem;
}

.skills-category span {
  display: block;
  margin-bottom: 0.5rem;
  font-size: 1rem;
  color: #d5bda5; /* Bronceado claro */
}

.skill-bar {
  width: 100%;
  height: 10px;
  background-color: #526760; /* Verde neutro */
  border-radius: 5px;
  overflow: hidden;
  position: relative;
}

.skill-level {
  height: 100%;
  background-color: #d5bda5; /* Bronceado claro */
  transition: width 0.5s ease;
}
</style>
