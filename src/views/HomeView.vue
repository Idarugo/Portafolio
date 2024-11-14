<template>
  <div class="portfolio">
    <!-- Header -->
    <HeaderComponent :sections="sections" />

    <!-- Hero Section -->
    <HeroSection />

    <main>
      <!-- Sobre Mí -->
      <AboutMeSection
        :profileImage="'https://via.placeholder.com/200'"
        :description="aboutDescription"
        :additionalInfo="aboutAdditionalInfo"
      />

      <!-- Proyectos -->
      <ProjectsSection :projects="projects" />

      <!-- Habilidades -->
      <SkillsSection :skills="skills" />

      <!-- Experiencia -->
      <ExperienceSection :experience="experience" />

      <!-- Testimonios -->
      <TestimonialsSection :testimonials="testimonials" />

      <!-- Contacto -->
      <ContactSection />
    </main>

    <!-- Footer -->
    <FooterComponent />
  </div>
</template>

<script setup>
import HeaderComponent from '@/components/HeaderComponent.vue'
import HeroSection from '@/components/HeroSection.vue'
import AboutMeSection from '@/components/AboutMeSection.vue'
import ProjectsSection from '@/components/ProjectsSection.vue'
import SkillsSection from '@/components/SkillsSection.vue'
import ExperienceSection from '@/components/ExperienceSection.vue'
import TestimonialsSection from '@/components/TestimonialsSection.vue'
import ContactSection from '@/components/ContactSection.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<style scoped>
.portfolio {
  font-family: 'Inter', sans-serif;
  background-color: var(--primary-bg-color);
  color: var(--text-color-primary);
}

/* Espaciado global para las secciones */
main > section {
  margin: 3rem 0; /* Espacio entre secciones */
}

main > section:first-child {
  margin-top: 0; /* Quitar margen superior al primer hijo */
}

main > section:last-child {
  margin-bottom: 3rem; /* Espacio adicional para separar el último hijo del footer */
}

/* Espaciado entre Contacto y Footer */
.contact-section {
  margin-bottom: 2rem; /* Asegura espacio entre ContactSection y Footer */
}
</style>
