<script setup lang="ts"></script>

<template>
  <UApp>
    <UContainer>
      <UHeader title="Nuxt UI" :ui="{ root: 'border-b-0' }" />

      <UMain>
        <RouterView />
      </UMain>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
