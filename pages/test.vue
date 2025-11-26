<script setup lang="ts">
useHead({ title: 'test' })
</script>
<template>
  <div class="pa-16">
    <v-card class="pa-10">
      <h1 class="text-h4 font-weight-bold mb-5">Test Page</h1>
      <p class="text-subtitle-1 mb-5">This is a new test screen.</p>
      
      <h3 class="text-h5 font-weight-bold mb-3">Features</h3>
      <ul class="text-body-1 mb-5 pl-5">
        <li>Simple and clean design</li>
        <li>Follows Nuxt 3 best practices</li>
        <li>Uses Vuetify components</li>
      </ul>
      
      <v-divider class="my-5" />
      
      <nuxt-link to="/">To index page</nuxt-link>
    </v-card>
  </div>
</template>
