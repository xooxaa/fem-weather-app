<script setup lang="ts"></script>

<template>
  <UApp>
    <UContainer :ui="{ base: 'max-w-6xl' }">
      <UHeader
        :toggle="{
          class: 'hidden',
        }"
        :ui="{
          root: 'border-b-0',
          container: 'px-0 sm:px-0 lg:px-0 mt-8',
        }"
      >
        <template #left>
          <img src="@/assets/images/logo.svg" alt="Logo" />
        </template>

        <template #right> Units </template>
      </UHeader>

      <UMain>
        <RouterView />
      </UMain>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
