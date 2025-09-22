<script setup lang="ts">
defineProps({
  active: {
    type: Boolean,
    required: true,
  },
});

defineEmits(["click"]);
</script>

<template>
  <UButton
    color="neutral"
    variant="ghost"
    class="grow text-center hover:cursor-pointer hover:bg-neutral-500 w-full justify-between"
    :class="{ 'bg-neutral-600': active }"
    :trailing-icon="active ? 'i-lucide-check' : undefined"
    @click="$emit('click')"
  >
    <slot />
  </UButton>
</template>
