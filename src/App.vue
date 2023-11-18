<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <v-app>
    <div class="container">
      <RouterView />
    </div>
  </v-app>
</template>

<style lang="scss" scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  width: 100%;

  margin-top: 4rem;
}
</style>
