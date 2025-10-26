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
  "It's raining men!",
  "Walking on sunshine!",
  "Rusted from the Rain!",
  "Over the Rainbow!",
  "Cover me in sunshine!",
];

const headlinesExtended = [
  {
    title: "When the sun goes down?",
    author: "Arctic Monkeys",
    link: "https://www.youtube.com/watch?v=EqkBRVukQmE",
  },
  {
    title: "Blowing in the wind?",
    author: "Bob Dylan",
    link: "https://www.youtube.com/watch?v=MMFj8uDubsE",
  },
  {
    title: "Here comes the sun!",
    author: "The Beatles",
    link: "https://www.youtube.com/watch?v=n6j4TGqVl5g",
  },
  {
    title: "You are my sunshine!",
    author: "Johnny Cash",
    link: "https://www.youtube.com/watch?v=cGa3zFRqDn4",
  },
  {
    title: "Let the sun shine in!",
    author: "The 5th Dimension",
    link: "https://www.youtube.com/watch?v=dxNvFVI2G38",
  },
  {
    title: "You can stand under my umbrella!",
    author: "Rihanna",
    link: "https://www.youtube.com/watch?v=CvBfHwUxHIk",
  },
];

const randomIndex = Math.floor(Math.random() * headlines.length);
const headline = headlines[randomIndex];
</script>

<template>
  <div class="w-full text-center mt-8">
    <h1 class="text-6xl font-serif">{{ headline }}</h1>
  </div>
</template>
