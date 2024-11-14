<template>
  <div class="project-card">
    <div class="project-image" :style="{ backgroundImage: `url(${project.image})` }"></div>
    <div class="project-info">
      <h3>{{ project.title }}</h3>
      <p>{{ project.description }}</p>
      <div class="project-links">
        <a
          v-if="project.demo"
          :href="project.demo"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-primary"
        >
          Demo
        </a>
        <a
          v-if="project.repo"
          :href="project.repo"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-secondary"
        >
          Código
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(['project'])
</script>

<style scoped>
.project-card {
  background-color: var(--card-bg);
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.project-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

.project-image {
  height: 180px;
  background-size: cover;
  background-position: center;
}

.project-info {
  padding: 1.5rem;
  text-align: left;
}

.project-info h3 {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
  color: var(--secondary-color);
}

.project-info p {
  margin-bottom: 1rem;
  color: var(--text-color);
}

.project-links {
  display: flex;
  gap: 1rem;
}

.btn {
  display: inline-block;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  font-weight: bold;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn-primary {
  background-color: var(--primary-color);
  color: white;
}

.btn-primary:hover {
  background-color: var(--accent-color);
}

.btn-secondary {
  background-color: transparent;
  color: var(--secondary-color);
  border: 2px solid var(--secondary-color);
}

.btn-secondary:hover {
  background-color: var(--secondary-color);
  color: white;
}
</style>
