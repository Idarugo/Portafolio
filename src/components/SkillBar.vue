<template>
  <li class="skill-bar">
    <span class="skill-name"> <i :class="skill.icon"></i> {{ skill.name }} </span>
    <div class="progress-bar">
      <div class="progress" :style="{ width: `${skill.level}%` }" :data-level="skill.level"></div>
    </div>
  </li>
</template>

<script setup>
defineProps({
  skill: { type: Object, required: true }
})
</script>

<style scoped>
.skill-bar {
  margin-bottom: 1rem;
}

.skill-name {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-weight: 600;
  color: var(--secondary-color);
}

.progress-bar {
  height: 10px;
  background-color: #e0e0e0;
  border-radius: 5px;
  overflow: hidden;
  margin-top: 0.5rem;
}

.progress {
  height: 100%;
  transition: width 0.4s ease-in-out;
  background-color: var(--primary-color);
}

/* Colores dinámicos para los niveles */
.progress[data-level='90'] {
  background-color: #27ae60; /* Verde */
}
.progress[data-level='75'] {
  background-color: #f39c12; /* Amarillo */
}
.progress[data-level='60'] {
  background-color: #e74c3c; /* Rojo */
}
</style>
