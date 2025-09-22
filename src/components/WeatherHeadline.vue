<script setup lang="ts">
const headlines = [
  "How's the sky looking today?",
  "Singing in the rain?",
  "I wear my sunglasses at night!",
  "Here comes the sun!",
  "You can stand under my umbrella!",
  "Let the sun shine in!",
  "Blowing in the wind?",
  "You are my sunshine!",
  "When the sun goes down?",
];
const randomIndex = Math.floor(Math.random() * headlines.length);
const headline = headlines[randomIndex];
</script>

<template>
  <div class="w-full text-center mt-8">
    <h1 class="text-6xl font-serif">{{ headline }}</h1>
  </div>
</template>
