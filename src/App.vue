<script setup lang="ts"></script>

<template>
  <UApp>
    <UContainer>
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

        <template #right> <UnitsDropdown /> </template>
      </UHeader>

      <UMain>
        <RouterView />
      </UMain>
    </UContainer>
  </UApp>
</template>

<style scoped></style>
