<template>
  <div class="timeline-item" :class="{ left: isLeft, right: !isLeft }">
    <div class="timeline-content">
      <h3>{{ job.title }}</h3>
      <h4>{{ job.company }}</h4>
      <p class="timeline-date">{{ job.period }}</p>
      <ul>
        <li v-for="responsibility in job.responsibilities" :key="responsibility">
          {{ responsibility }}
        </li>
      </ul>
    </div>
  </div>
</template>
  
  <script setup>
defineProps(['job'])

const isLeft = Math.random() < 0.5 // Alterna entre izquierda y derecha
</script>
  
  <style scoped>
.timeline-item {
  padding: 1rem 2rem;
  position: relative;
  background-color: inherit;
  width: 50%;
}

.timeline-item.left {
  left: 0;
}

.timeline-item.right {
  left: 50%;
}

.timeline-item::after {
  content: '';
  position: absolute;
  width: 25px;
  height: 25px;
  top: 15px;
  background-color: var(--bg-color);
  border: 4px solid var(--primary-color);
  border-radius: 50%;
  z-index: 1;
}

.timeline-item.left::after {
  right: -12.5px;
}

.timeline-item.right::after {
  left: -12.5px;
}

.timeline-content {
  padding: 1rem;
  background-color: var(--card-bg);
  border-radius: 6px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  position: relative;
  text-align: left;
}

.timeline-content h3 {
  color: var(--secondary-color);
  margin: 0;
}

.timeline-content h4 {
  color: var(--text-color);
  font-size: 1rem;
  margin: 0.5rem 0;
}

.timeline-content p {
  font-size: 0.9rem;
  color: var(--text-light);
  margin: 0.5rem 0;
}

.timeline-content ul {
  list-style-type: disc;
  padding-left: 1rem;
}

.timeline-content ul li {
  margin-bottom: 0.5rem;
}

@media (max-width: 768px) {
  .timeline-item {
    width: 100%;
    left: 0;
    padding-left: 50px;
    padding-right: 25px;
  }

  .timeline-item::after {
    left: 15px;
  }

  .timeline-content {
    text-align: left;
  }
}
</style>
  