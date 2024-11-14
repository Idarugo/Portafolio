<template>
  <div class="skill-category">
    <h3>{{ category }}</h3>
    <ul>
      <SkillBar v-for="skill in skills" :key="skill.name" :skill="skill" />
    </ul>
  </div>
</template>

<script setup>
import SkillBar from './SkillBar.vue'

defineProps({
  category: { type: String, required: true },
  skills: { type: Array, required: true }
})
</script>

<style scoped>
.skill-category {
  background-color: var(--card-bg);
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h3 {
  color: var(--secondary-color);
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
