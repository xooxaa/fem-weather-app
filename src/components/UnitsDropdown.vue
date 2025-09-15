<script setup lang="ts"></script>

<template>
  <UPopover
    mode="hover"
    :open-delay="0"
    :close-delay="50"
    :content="{
      align: 'end',
      side: 'bottom',
    }"
  >
    <UButton
      icon="i-lucide-settings"
      trailing-icon="i-lucide-chevron-down"
      label="Units"
      color="neutral"
      variant="subtle"
    />

    <template #content>
      <Placeholder class="size-48 m-4 inline-flex" />
    </template>
  </UPopover>
</template>

<style scoped></style>
