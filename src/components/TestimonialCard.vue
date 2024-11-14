<template>
  <div class="testimonial-card">
    <p class="testimonial-text">"{{ testimonial.text }}"</p>
    <div class="testimonial-author">
      <img :src="testimonial.avatar" :alt="testimonial.author" class="author-avatar" />
      <div>
        <p class="author-name">{{ testimonial.author }}</p>
        <p class="author-position">{{ testimonial.position }}</p>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
defineProps(['testimonial'])
</script>
  
  <style scoped>
.testimonial-card {
  background-color: var(--card-bg);
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.testimonial-text {
  font-style: italic;
  margin-bottom: 1.5rem;
  color: var(--text-color);
}

.testimonial-author {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
}

.author-avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  object-fit: cover;
}

.author-name {
  font-weight: 600;
  color: var(--secondary-color);
}

.author-position {
  font-size: 0.9rem;
  color: var(--text-light);
}
</style>
  